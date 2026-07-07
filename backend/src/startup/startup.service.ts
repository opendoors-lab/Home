import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AccountStatus, AssignmentStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { MailerService } from '../common/services/mailer.service';
import { PermissionsService } from '../common/services/permissions.service';
import { PasswordService } from '../auth/password.service';

export const OWNER_STARTUP_EMAIL_TYPE = 'OWNER_STARTUP_WELCOME';

@Injectable()
export class StartupService implements OnApplicationBootstrap {
  private readonly logger = new Logger(StartupService.name);

  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
    private readonly mailer: MailerService,
    private readonly permissions: PermissionsService,
    private readonly password: PasswordService,
  ) {}

  async onApplicationBootstrap() {
    await this.bootstrapSuperAdmins();
    await this.sendOwnerWelcomeIfNeeded();
  }

  private async bootstrapSuperAdmins() {
    const ownerEmail = this.config.get<string>('OWNER_EMAIL');
    if (!ownerEmail) {
      this.logger.warn('OWNER_EMAIL not set — skipping super admin bootstrap');
      return;
    }

    const superAdminRole = await this.prisma.role.findUnique({
      where: { name: 'Super Admin' },
    });
    if (!superAdminRole) {
      this.logger.warn('Super Admin role not seeded — run prisma db seed');
      return;
    }

    const owner = await this.permissions.ensureOwnerUser(
      ownerEmail.toLowerCase().trim(),
    );
    await this.ensureApprovedRole(owner.id, superAdminRole.id, owner.id);
    this.logger.log(`Owner ${owner.email} linked to Super Admin role`);

    const secondEmail = this.config.get<string>('SUPER_ADMIN_EMAIL_2');
    if (!secondEmail) {
      this.logger.log('SUPER_ADMIN_EMAIL_2 not set — skipping second super admin');
      return;
    }

    const normalizedSecond = secondEmail.toLowerCase().trim();
    if (normalizedSecond === owner.email) {
      this.logger.log('SUPER_ADMIN_EMAIL_2 matches owner — skipping duplicate user');
      return;
    }

    const secondPassword = this.config.get<string>('SUPER_ADMIN_PASSWORD_2');
    let secondUser = await this.prisma.user.findUnique({
      where: { email: normalizedSecond },
    });

    if (!secondUser) {
      if (!secondPassword) {
        this.logger.warn(
          'SUPER_ADMIN_PASSWORD_2 not set — cannot create second super admin user',
        );
        return;
      }

      const passwordHash = await this.password.hash(secondPassword);
      secondUser = await this.prisma.user.create({
        data: {
          email: normalizedSecond,
          name: 'Super Admin',
          accountStatus: AccountStatus.ACTIVE,
          passwordHash,
          mustChangePassword: true,
        },
      });
      this.logger.log(`Created second super admin user: ${normalizedSecond}`);
    } else if (!secondUser.passwordHash && secondPassword) {
      const passwordHash = await this.password.hash(secondPassword);
      secondUser = await this.prisma.user.update({
        where: { id: secondUser.id },
        data: {
          passwordHash,
          accountStatus: AccountStatus.ACTIVE,
          mustChangePassword: true,
        },
      });
      this.logger.log(`Set password for existing super admin user: ${normalizedSecond}`);
    }

    await this.ensureApprovedRole(secondUser.id, superAdminRole.id, owner.id);
    this.logger.log(`Second super admin ${normalizedSecond} linked to Super Admin role`);
  }

  private async ensureApprovedRole(
    userId: string,
    roleId: string,
    approvedById: string,
  ) {
    await this.prisma.userRole.upsert({
      where: { userId_roleId: { userId, roleId } },
      update: {
        status: AssignmentStatus.APPROVED,
        approvedById,
      },
      create: {
        userId,
        roleId,
        status: AssignmentStatus.APPROVED,
        assignedById: approvedById,
        approvedById,
      },
    });
  }

  private async sendOwnerWelcomeIfNeeded() {
    const ownerEmail = this.config.get<string>('OWNER_EMAIL');
    if (!ownerEmail) {
      this.logger.warn('OWNER_EMAIL not set — skipping startup welcome message');
      return;
    }

    const email = ownerEmail.toLowerCase().trim();
    await this.permissions.ensureOwnerUser(email);

    const existing = await this.prisma.sentEmail.findUnique({
      where: {
        email_type: { email, type: OWNER_STARTUP_EMAIL_TYPE },
      },
    });

    if (existing) {
      this.logger.log(
        `Startup welcome already sent to ${email} at ${existing.sentAt.toISOString()} — not sending again`,
      );
      return;
    }

    const ownerPassword = this.config.get<string>('OWNER_PASSWORD');
    if (!ownerPassword) {
      this.logger.warn(
        'OWNER_PASSWORD not set — skipping startup welcome message',
      );
      return;
    }

    this.logger.log(`Sending startup welcome message to owner: ${email}`);

    try {
      await this.mailer.sendOwnerStartupWelcome(email, ownerPassword);
      await this.prisma.sentEmail.create({
        data: { email, type: OWNER_STARTUP_EMAIL_TYPE },
      });
      this.logger.log(
        `Startup welcome message sent and saved to database for ${email}`,
      );
    } catch (err) {
      this.logger.error(
        `Failed to send startup welcome to ${email} — not marking as sent`,
        err,
      );
    }
  }
}
