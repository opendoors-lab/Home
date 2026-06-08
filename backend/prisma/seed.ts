import { PrismaClient } from '@prisma/client';
import { PERMISSIONS } from '@company/shared';

const prisma = new PrismaClient();

const PERMISSION_LABELS: Record<string, string> = {
  [PERMISSIONS.CREATE_POST]: 'Create posts',
  [PERMISSIONS.EDIT_OWN_POST]: 'Edit own posts',
  [PERMISSIONS.EDIT_ANY_POST]: 'Edit any post',
  [PERMISSIONS.DELETE_POST]: 'Delete posts',
  [PERMISSIONS.SUBMIT_POST]: 'Submit posts for review',
  [PERMISSIONS.APPROVE_POST]: 'Approve posts',
  [PERMISSIONS.REJECT_POST]: 'Reject posts',
  [PERMISSIONS.VIEW_PENDING_QUEUE]: 'View pending review queue',
  [PERMISSIONS.INVITE_USER]: 'Invite users',
  [PERMISSIONS.MANAGE_USERS]: 'Manage users',
  [PERMISSIONS.MANAGE_ROLES]: 'Manage roles',
  [PERMISSIONS.ASSIGN_ROLES]: 'Assign roles to users',
  [PERMISSIONS.VIEW_AUDIT_LOG]: 'View audit log',
};

const BASELINE_ROLES: {
  name: string;
  description: string;
  permissions: string[];
}[] = [
  {
    name: 'System Admin',
    description: 'Platform administrator',
    permissions: [
      PERMISSIONS.INVITE_USER,
      PERMISSIONS.MANAGE_USERS,
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
