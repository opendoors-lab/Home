import { Injectable, NotFoundException } from '@nestjs/common';
import { PostStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PublicService {
  constructor(private readonly prisma: PrismaService) {}

  async latest(limit = 3) {
    const posts = await this.prisma.post.findMany({
      where: { status: PostStatus.PUBLISHED },
      include: { author: true },
      orderBy: { publishedAt: 'desc' },
      take: limit,
    });
    return posts.map((p) => this.toSummary(p));
  }

  async list(page = 1, pageSize = 12) {
    const skip = (page - 1) * pageSize;
    const [items, total] = await Promise.all([
      this.prisma.post.findMany({
        where: { status: PostStatus.PUBLISHED },
        include: { author: true },
        orderBy: { publishedAt: 'desc' },
        skip,
        take: pageSize,
      }),
      this.prisma.post.count({ where: { status: PostStatus.PUBLISHED } }),
    ]);

    return {
      items: items.map((p) => this.toSummary(p)),
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async bySlug(slug: string) {
    const post = await this.prisma.post.findFirst({
      where: { slug, status: PostStatus.PUBLISHED },
      include: { author: true },
    });
    if (!post) throw new NotFoundException('Post not found');

    return {
      ...this.toSummary(post),
      body: post.body,
    };
  }

  private toSummary(post: {
    id: string;
    slug: string;
    title: string;
    excerpt: string | null;
    coverImageUrl: string | null;
    publishedAt: Date | null;
    author: { name: string | null };
  }) {
    return {
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      coverImageUrl: post.coverImageUrl,
      authorName: post.author.name,
      publishedAt: post.publishedAt?.toISOString() ?? '',
    };
  }
}
