import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AccountStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { MailerService } from '../common/services/mailer.service';
import { PermissionsService } from '../common/services/permissions.service';

export const OWNER_STARTUP_EMAIL_TYPE = 'OWNER_STARTUP_WELCOME';

@Injectable()
export class StartupService implements OnApplicationBootstrap {
  private readonly logger = new Logger(StartupService.name);

  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
    private readonly mailer: MailerService,
    private readonly permissions: PermissionsService,
  ) {}

  async onApplicationBootstrap() {
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
