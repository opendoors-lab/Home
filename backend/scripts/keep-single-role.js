require('./set-database-url.js');
const { PrismaClient } = require('@prisma/client');

const EMAIL = 'opendoors.ethiopia@gmail.com';
const KEEP_ROLE = 'writer_admin';

async function main() {
  const prisma = new PrismaClient();
  try {
    const user = await prisma.user.findUnique({ where: { email: EMAIL } });
    if (!user) {
      console.error(`User not found: ${EMAIL}`);
      process.exit(1);
    }

    const keepRole = await prisma.role.findUnique({ where: { name: KEEP_ROLE } });
    if (!keepRole) {
      console.error(`Role not found: ${KEEP_ROLE}`);
      process.exit(1);
    }

    const removed = await prisma.userRole.deleteMany({
      where: {
        userId: user.id,
        NOT: { roleId: keepRole.id },
      },
    });

    const remaining = await prisma.userRole.findMany({
      where: { userId: user.id },
      include: { role: true },
    });

    console.log(`Removed ${removed.count} role assignment(s) from ${EMAIL}`);
    console.log(
      'Remaining roles:',
      remaining.map((r) => r.role.name).join(', ') || 'none',
    );
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
