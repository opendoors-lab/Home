# Deployment Guide

## Prerequisites

- Node.js 20+
- PostgreSQL 16 (local install or managed service)
- SMTP credentials for magic-link auth
- Writable `backend/upload/` folder for blog images (created automatically)

## Local development

```bash
# Install dependencies
npm install
npm run build:shared

# Set DATABASE_* in .env (see .env.example), then:
npm run db:migrate
npm run db:seed

# Copy env
cp .env.example .env
cp mobimates/.env.example mobimates/.env.local

# Run both apps
npm run dev:api   # http://localhost:4000
npm run dev:web   # http://localhost:3000
```

Example Postgres settings in `.env`:

```
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=mobimatesHome
```

The API builds `DATABASE_URL` automatically from these values for Prisma.

## Onboarding chain (smoke test)

1. Set `OWNER_EMAIL` in `.env` to your email.
2. Visit `/admin/login` and request a magic link (check API logs if SMTP not configured).
3. As Owner, bootstrap a System Admin at `/admin/users`.
4. System Admin invites Author and Reviewer users, assigns roles.
5. Owner approves role assignments at `/admin/role-approvals`.
6. Author creates and submits a post; two Reviewers approve; post appears on `/blog`.

## Production

### API (Node)

```bash
npm run build:shared
npm run build:api

# On the host, run migrations + seed once:
npm run db:migrate -w backend
npm run db:seed -w backend

# Start the API
npm run start:prod -w backend
```

Use a process manager (PM2, systemd, etc.) and set the `DATABASE_*` variables (or `DATABASE_URL`) for managed Postgres.

### Web (Vercel / Node)

Deploy `mobimates` with:

- `NEXT_PUBLIC_API_URL` → production API URL
- `REVALIDATE_SECRET` → same value as backend

Set backend `FRONTEND_URL` to the deployed web URL.

## Environment variables

See `.env.example` at the repo root for the full list.
