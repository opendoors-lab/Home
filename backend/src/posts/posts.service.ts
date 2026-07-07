import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ApprovalDecision, PostStatus } from '@prisma/client';
import sanitizeHtml from 'sanitize-html';
import slugify from 'slugify';
import { PERMISSIONS } from '@company/shared';
import { PrismaService } from '../prisma/prisma.service';
import { PermissionsService } from '../common/services/permissions.service';
import { AuditService } from '../common/services/audit.service';
import { MailerService } from '../common/services/mailer.service';
import { RevalidationService } from '../common/services/revalidation.service';
import { AuthUser } from '../common/types/auth-user';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly permissions: PermissionsService,
    private readonly audit: AuditService,
    private readonly mailer: MailerService,
    private readonly revalidation: RevalidationService,
  ) {}

  private sanitize(html: string) {
    return sanitizeHtml(html, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2']),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: ['src', 'alt', 'title', 'width', 'height'],
        a: ['href', 'name', 'target', 'rel'],
      },
    });
  }

  private async uniqueSlug(title: string, excludeId?: string) {
    let base = slugify(title, { lower: true, strict: true }) || 'post';
    let slug = base;
    let i = 1;
    while (true) {
      const existing = await this.prisma.post.findUnique({ where: { slug } });
      if (!existing || existing.id === excludeId) break;
      slug = `${base}-${i++}`;
    }
    return slug;
  }

  async create(dto: CreatePostDto, author: AuthUser) {
    const slug = await this.uniqueSlug(dto.title);
    const post = await this.prisma.post.create({
      data: {
        title: dto.title,
        slug,
        body: this.sanitize(dto.body),
        excerpt: dto.excerpt,
        coverImageUrl: dto.coverImageUrl,
        authorId: author.id,
        status: PostStatus.DRAFT,
      },
      include: { author: true, approvals: { include: { reviewer: true } } },
    });
    return this.toDto(post);
  }

  async listMine(author: AuthUser) {
    const posts = await this.prisma.post.findMany({
      where: { authorId: author.id },
      include: { author: true, approvals: { include: { reviewer: true } } },
      orderBy: { updatedAt: 'desc' },
    });
    return posts.map((p) => this.toDto(p));
  }

  async listAll() {
    const posts = await this.prisma.post.findMany({
      include: { author: true, approvals: { include: { reviewer: true } } },
      orderBy: { updatedAt: 'desc' },
    });
    return posts.map((p) => this.toDto(p));
  }

  async listPending() {
    const posts = await this.prisma.post.findMany({
      where: { status: PostStatus.PENDING_REVIEW },
      include: { author: true, approvals: { include: { reviewer: true } } },
      orderBy: { updatedAt: 'desc' },
    });
    return posts.map((p) => this.toDto(p));
  }

  async getById(id: string) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: { author: true, approvals: { include: { reviewer: true } } },
    });
    if (!post) throw new NotFoundException('Post not found');
    return this.toDto(post);
  }

  async update(id: string, dto: UpdatePostDto, user: AuthUser) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) throw new NotFoundException();

    const canEditAny = await this.permissions.hasPermission(
      user,
      PERMISSIONS.EDIT_ANY_POST,
    );
    const canEditOwn =
      post.authorId === user.id &&
      (await this.permissions.hasPermission(user, PERMISSIONS.EDIT_OWN_POST));

    if (!canEditAny && !canEditOwn) {
      throw new ForbiddenException();
    }

    if (
      post.status !== PostStatus.DRAFT &&
      post.status !== PostStatus.REJECTED
    ) {
      throw new BadRequestException('Only draft or rejected posts can be edited');
    }

    const data: Record<string, unknown> = {};
    if (dto.title) {
      data.title = dto.title;
      data.slug = await this.uniqueSlug(dto.title, id);
    }
    if (dto.body !== undefined) data.body = this.sanitize(dto.body);
    if (dto.excerpt !== undefined) data.excerpt = dto.excerpt;
    if (dto.coverImageUrl !== undefined) data.coverImageUrl = dto.coverImageUrl;

    if (post.status === PostStatus.REJECTED) {
      data.status = PostStatus.DRAFT;
      await this.prisma.postApproval.deleteMany({ where: { postId: id } });
    }

    const updated = await this.prisma.post.update({
      where: { id },
      data,
      include: { author: true, approvals: { include: { reviewer: true } } },
    });
    return this.toDto(updated);
  }

  async delete(id: string) {
    await this.prisma.post.delete({ where: { id } });
    return { ok: true };
  }

  async submit(id: string, user: AuthUser) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) throw new NotFoundException();
    if (post.authorId !== user.id) throw new ForbiddenException();
    if (post.status !== PostStatus.DRAFT && post.status !== PostStatus.REJECTED) {
      throw new BadRequestException('Post cannot be submitted');
    }

    await this.prisma.postApproval.deleteMany({ where: { postId: id } });

    const canAutoPublish = await this.permissions.hasPermission(
      user,
      PERMISSIONS.APPROVE_OWN_POST,
    );

    if (canAutoPublish) {
      await this.prisma.post.update({
        where: { id },
        data: { status: PostStatus.PENDING_REVIEW },
      });
      await this.publish(id, user.id);
      return this.getById(id);
    }

    const updated = await this.prisma.post.update({
      where: { id },
      data: { status: PostStatus.PENDING_REVIEW },
      include: { author: true, approvals: { include: { reviewer: true } } },
    });
    return this.toDto(updated);
  }

  async approve(id: string, reviewer: AuthUser) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: { author: true },
    });
    if (!post) throw new NotFoundException();
    if (post.status !== PostStatus.PENDING_REVIEW) {
      throw new BadRequestException('Post is not pending review');
    }

    const canApproveOwn = await this.permissions.hasPermission(
      reviewer,
      PERMISSIONS.APPROVE_OWN_POST,
    );
    const isAuthor = reviewer.id === post.authorId;

    if (isAuthor && !canApproveOwn) {
      throw new ForbiddenException('Author cannot approve own post');
    }

    await this.prisma.postApproval.upsert({
      where: {
        postId_reviewerId: { postId: id, reviewerId: reviewer.id },
      },
      create: {
        postId: id,
        reviewerId: reviewer.id,
        decision: ApprovalDecision.APPROVE,
      },
      update: { decision: ApprovalDecision.APPROVE, comment: null },
    });

    if (isAuthor && canApproveOwn) {
      await this.publish(id, reviewer.id);
      return this.getById(id);
    }

    let approvalCount = await this.prisma.postApproval.count({
      where: { postId: id, decision: ApprovalDecision.APPROVE },
    });

    if (canApproveOwn && !isAuthor) {
      approvalCount += 1;
    }

    if (approvalCount >= 2) {
      await this.publish(id, reviewer.id);
    }

    return this.getById(id);
  }

  async reject(id: string, comment: string, reviewer: AuthUser) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: { author: true },
    });
    if (!post) throw new NotFoundException();
    if (post.status !== PostStatus.PENDING_REVIEW) {
      throw new BadRequestException('Post is not pending review');
    }
    if (reviewer.id === post.authorId) {
      throw new ForbiddenException('Author cannot reject own post');
    }

    await this.prisma.postApproval.upsert({
      where: {
        postId_reviewerId: { postId: id, reviewerId: reviewer.id },
      },
      create: {
        postId: id,
        reviewerId: reviewer.id,
        decision: ApprovalDecision.REJECT,
        comment,
      },
      update: { decision: ApprovalDecision.REJECT, comment },
    });

    await this.prisma.postApproval.deleteMany({
      where: { postId: id, decision: ApprovalDecision.APPROVE },
    });

    await this.prisma.post.update({
      where: { id },
      data: { status: PostStatus.REJECTED },
    });

    await this.audit.log(reviewer.id, 'POST_REJECTED', 'Post', id, { comment });
    await this.mailer.sendPostRejected(post.author.email, post.title, comment);

    return this.getById(id);
  }

  private async publish(postId: string, actorId: string) {
    const post = await this.prisma.post.update({
      where: { id: postId },
      data: {
        status: PostStatus.PUBLISHED,
        publishedAt: new Date(),
      },
      include: { author: true },
    });

    await this.audit.log(actorId, 'POST_PUBLISHED', 'Post', postId);
    await this.mailer.sendPostPublished(
      post.author.email,
      post.title,
      post.slug,
    );
    await this.revalidation.revalidateBlog();
  }

  private toDto(post: {
    id: string;
    slug: string;
    title: string;
    body: string;
    excerpt: string | null;
    coverImageUrl: string | null;
    authorId: string;
    status: PostStatus;
    publishedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    author: { name: string | null };
    approvals: {
      id: string;
      reviewerId: string;
      decision: ApprovalDecision;
      comment: string | null;
      createdAt: Date;
      reviewer: { name: string | null };
    }[];
  }) {
    const approvalCount = post.approvals.filter(
      (a) => a.decision === ApprovalDecision.APPROVE,
    ).length;

    return {
      id: post.id,
      slug: post.slug,
      title: post.title,
      body: post.body,
      excerpt: post.excerpt,
      coverImageUrl: post.coverImageUrl,
      authorId: post.authorId,
      authorName: post.author.name,
      status: post.status,
      approvalCount,
      approvals: post.approvals.map((a) => ({
        id: a.id,
        reviewerId: a.reviewerId,
        reviewerName: a.reviewer.name,
        decision: a.decision,
        comment: a.comment,
        createdAt: a.createdAt.toISOString(),
      })),
      publishedAt: post.publishedAt?.toISOString() ?? null,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    };
  }
}
