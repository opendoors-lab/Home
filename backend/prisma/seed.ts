import { PrismaClient } from '@prisma/client';
import { ALL_PERMISSION_KEYS, PERMISSIONS, PERMISSION_LABELS } from '@company/shared';

// Load DATABASE_URL from repo .env (DATABASE_HOST, etc.) when seed runs via `npx prisma db seed`
require('../scripts/set-database-url.js');

const prisma = new PrismaClient();

const BASELINE_ROLES: {
  name: string;
  description: string;
  permissions: string[];
}[] = [
  {
    name: 'Super Admin',
    description: 'Full platform access (all permissions)',
    permissions: [...ALL_PERMISSION_KEYS],
  },
  {
    name: 'System Admin',
    description: 'Manage users, roles, assignments, and audit log',
    permissions: [
      PERMISSIONS.INVITE_USER,
      PERMISSIONS.MANAGE_USERS,
      PERMISSIONS.MANAGE_ROLES,
      PERMISSIONS.ASSIGN_ROLES,
      PERMISSIONS.VIEW_AUDIT_LOG,
    ],
  },
  {
    name: 'Author',
    description: 'Blog author',
    permissions: [
      PERMISSIONS.CREATE_POST,
      PERMISSIONS.EDIT_OWN_POST,
      PERMISSIONS.SUBMIT_POST,
    ],
  },
  {
    name: 'Reviewer',
    description: 'Content reviewer',
    permissions: [
      PERMISSIONS.APPROVE_POST,
      PERMISSIONS.REJECT_POST,
      PERMISSIONS.VIEW_PENDING_QUEUE,
    ],
  },
  {
    name: 'Admin approve post',
    description:
      'Can write and self-publish; a single approval counts as two for other authors',
    permissions: [
      PERMISSIONS.CREATE_POST,
      PERMISSIONS.EDIT_OWN_POST,
      PERMISSIONS.SUBMIT_POST,
      PERMISSIONS.APPROVE_POST,
      PERMISSIONS.APPROVE_OWN_POST,
      PERMISSIONS.REJECT_POST,
      PERMISSIONS.VIEW_PENDING_QUEUE,
    ],
  },
];

async function main() {
  for (const [key, label] of Object.entries(PERMISSION_LABELS)) {
    await prisma.permission.upsert({
      where: { key },
      update: { label },
      create: { key, label },
    });
  }

  for (const roleDef of BASELINE_ROLES) {
    const role = await prisma.role.upsert({
      where: { name: roleDef.name },
      update: { description: roleDef.description },
      create: {
        name: roleDef.name,
        description: roleDef.description,
        isSystem: true,
      },
    });

    for (const permKey of roleDef.permissions) {
      const perm = await prisma.permission.findUnique({ where: { key: permKey } });
      if (!perm) continue;
      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: { roleId: role.id, permissionId: perm.id },
        },
        update: {},
        create: { roleId: role.id, permissionId: perm.id },
      });
    }

    const allowedIds = (
      await prisma.permission.findMany({
        where: { key: { in: roleDef.permissions } },
        select: { id: true },
      })
    ).map((p) => p.id);

    if (allowedIds.length === 0) {
      await prisma.rolePermission.deleteMany({ where: { roleId: role.id } });
    } else {
      await prisma.rolePermission.deleteMany({
        where: { roleId: role.id, permissionId: { notIn: allowedIds } },
      });
    }
  }

  console.log('Seed complete: permissions and baseline roles ready.');
  console.log(
    `Owner authenticates via OWNER_EMAIL env (${process.env.OWNER_EMAIL ?? 'not set'}).`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
