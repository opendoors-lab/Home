require('./set-database-url.js');
const { PrismaClient, AccountStatus, AssignmentStatus } = require('@prisma/client');
const bcrypt = require('bcrypt');

async function main() {
  const email = (process.env.SUPER_ADMIN_EMAIL_2 || '').toLowerCase().trim();
  const password = process.env.SUPER_ADMIN_PASSWORD_2;
  const ownerEmail = (process.env.OWNER_EMAIL || '').toLowerCase().trim();

  if (!email || !password) {
    console.error('Set SUPER_ADMIN_EMAIL_2 and SUPER_ADMIN_PASSWORD_2 in .env');
    process.exit(1);
  }

  const prisma = new PrismaClient();
  try {
    const superAdminRole = await prisma.role.findUnique({
      where: { name: 'Super Admin' },
    });
    if (!superAdminRole) {
      console.error('Super Admin role missing — run npm run db:seed');
      process.exit(1);
    }

    const owner = await prisma.user.findUnique({ where: { email: ownerEmail } });
    const approvedById = owner?.id ?? undefined;

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.upsert({
      where: { email },
      create: {
        email,
        name: 'Super Admin',
        accountStatus: AccountStatus.ACTIVE,
        passwordHash,
        mustChangePassword: true,
      },
      update: {
        passwordHash,
        accountStatus: AccountStatus.ACTIVE,
      },
    });

    await prisma.userRole.upsert({
      where: { userId_roleId: { userId: user.id, roleId: superAdminRole.id } },
      update: { status: AssignmentStatus.APPROVED, approvedById },
      create: {
        userId: user.id,
        roleId: superAdminRole.id,
        status: AssignmentStatus.APPROVED,
        assignedById: approvedById,
        approvedById,
      },
    });

    console.log(`Super admin ready: ${email}`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
