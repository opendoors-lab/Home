require('../scripts/set-database-url.js');
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import * as request from 'supertest';
import { AccountStatus, AssignmentStatus, PostStatus } from '@prisma/client';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Business rules (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  const ownerEmail = 'owner@test.com';
  const authorEmail = 'author@test.com';
  const reviewer1Email = 'reviewer1@test.com';
  const reviewer2Email = 'reviewer2@test.com';

  beforeAll(async () => {
    process.env.OWNER_EMAIL = ownerEmail;
    process.env.JWT_ACCESS_SECRET = 'test-access-secret-min-32-characters';
    process.env.JWT_REFRESH_SECRET = 'test-refresh-secret-min-32-characters';
    process.env.FRONTEND_URL = 'http://localhost:3000';

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.use(cookieParser());
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    await app.init();

    prisma = app.get(PrismaService);
  });

  afterAll(async () => {
    await app.close();
  });

  async function createUser(email: string, roleName?: string) {
    const user = await prisma.user.create({
      data: {
        email,
        name: email.split('@')[0],
        accountStatus: AccountStatus.ACTIVE,
      },
    });
    if (roleName) {
      const role = await prisma.role.findUnique({ where: { name: roleName } });
      if (role) {
        await prisma.userRole.create({
          data: {
            userId: user.id,
            roleId: role.id,
            status: AssignmentStatus.APPROVED,
          },
        });
      }
    }
    return user;
  }

  async function loginAs(email: string) {
    const isOwner = email === ownerEmail;
    const user = isOwner
      ? null
      : await prisma.user.findUnique({ where: { email } });

    const agent = request.agent(app.getHttpServer());
    const { JwtService } = await import('@nestjs/jwt');
    const jwt = new JwtService({
      secret: process.env.JWT_ACCESS_SECRET,
    });

    const payload = {
      sub: isOwner ? `owner-${email}` : user!.id,
      email,
      isOwner,
    };

    const token = jwt.sign(payload);
    agent.set('Cookie', [`access_token=${token}`]);
    return agent;
  }

  beforeEach(async () => {
    await prisma.postApproval.deleteMany();
    await prisma.post.deleteMany();
    await prisma.userRole.deleteMany();
    await prisma.user.deleteMany();
    await prisma.authToken.deleteMany();
  });

  it('public endpoints return only PUBLISHED posts', async () => {
    const author = await createUser(authorEmail, 'Author');
    await prisma.post.create({
      data: {
        title: 'Draft Post',
        slug: 'draft-post',
        body: '<p>draft</p>',
        authorId: author.id,
        status: PostStatus.DRAFT,
      },
    });
    const published = await prisma.post.create({
      data: {
        title: 'Live Post',
        slug: 'live-post',
        body: '<p>live</p>',
        authorId: author.id,
        status: PostStatus.PUBLISHED,
        publishedAt: new Date(),
      },
    });

    const res = await request(app.getHttpServer()).get('/public/posts');
    expect(res.status).toBe(200);
    expect(res.body.items).toHaveLength(1);
    expect(res.body.items[0].slug).toBe(published.slug);
  });

  it('role assignments grant nothing until APPROVED by Owner', async () => {
    const user = await createUser(authorEmail);
    const authorRole = await prisma.role.findUnique({
      where: { name: 'Author' },
    });

    await prisma.userRole.create({
      data: {
        userId: user.id,
        roleId: authorRole!.id,
        status: AssignmentStatus.PENDING_OWNER_REVIEW,
      },
    });

    const agent = await loginAs(authorEmail);
    const me = await agent.get('/auth/me');
    expect(me.body.permissions).not.toContain('create_post');
  });

  it('DISABLED users cannot access protected endpoints', async () => {
    const user = await createUser(authorEmail, 'Author');
    await prisma.user.update({
      where: { id: user.id },
      data: { accountStatus: AccountStatus.DISABLED },
    });

    const agent = await loginAs(authorEmail);
    const res = await agent.get('/auth/me');
    expect(res.status).toBe(401);
  });

  it('author cannot approve own post', async () => {
    const author = await createUser(authorEmail, 'Author');
    await createUser(reviewer1Email, 'Reviewer');

    const authorWithReviewer = await prisma.user.update({
      where: { id: author.id },
      data: {},
    });
    const reviewerRole = await prisma.role.findUnique({
      where: { name: 'Reviewer' },
    });
    await prisma.userRole.create({
      data: {
        userId: author.id,
        roleId: reviewerRole!.id,
        status: AssignmentStatus.APPROVED,
      },
    });

    const post = await prisma.post.create({
      data: {
        title: 'My Post',
        slug: 'my-post',
        body: '<p>body</p>',
        authorId: author.id,
        status: PostStatus.PENDING_REVIEW,
      },
    });

    const agent = await loginAs(authorEmail);
    const res = await agent.post(`/posts/${post.id}/approve`);
    expect(res.status).toBe(403);
  });

  it('post publishes only after two distinct non-author approvals', async () => {
    const author = await createUser(authorEmail, 'Author');
    await createUser(reviewer1Email, 'Reviewer');
    await createUser(reviewer2Email, 'Reviewer');

    const post = await prisma.post.create({
      data: {
        title: 'Approval Post',
        slug: 'approval-post',
        body: '<p>body</p>',
        authorId: author.id,
        status: PostStatus.PENDING_REVIEW,
      },
    });

    const r1 = await loginAs(reviewer1Email);
    const first = await r1.post(`/posts/${post.id}/approve`);
    expect(first.status).toBe(200);
    expect(first.body.status).toBe(PostStatus.PENDING_REVIEW);
    expect(first.body.approvalCount).toBe(1);

    const r2 = await loginAs(reviewer2Email);
    const second = await r2.post(`/posts/${post.id}/approve`);
    expect(second.status).toBe(200);
    expect(second.body.status).toBe(PostStatus.PUBLISHED);

    const pub = await request(app.getHttpServer()).get(
      '/public/posts/approval-post',
    );
    expect(pub.status).toBe(200);
  });
});
