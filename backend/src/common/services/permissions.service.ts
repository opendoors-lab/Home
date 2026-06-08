import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AccountStatus } from '@prisma/client';
import { ALL_PERMISSION_KEYS } from '@company/shared';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthUser } from '../types/auth-user';

@Injectable()
export class PermissionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  isOwner(email: string): boolean {
    const ownerEmail = this.config.get<string>('OWNER_EMAIL');
    return !!ownerEmail && email.toLowerCase() === ownerEmail.toLowerCase();
  }

  /** Owner auth uses env credentials but posts/audit need a real User row. */
  async ensureOwnerUser(email: string) {
    const normalized = email.toLowerCase().trim();
    return this.prisma.user.upsert({
      where: { email: normalized },
      create: {
        email: normalized,
        name: 'Owner',
        accountStatus: AccountStatus.ACTIVE,
      },
      update: {
        accountStatus: AccountStatus.ACTIVE,
      },
    });
  }

  async getEffectivePermissions(user: AuthUser): Promise<Set<string>> {
    if (user.isOwner) {
      return new Set(ALL_PERMISSION_KEYS);
    }

    const assignments = await this.prisma.userRole.findMany({
      where: { userId: user.id, status: 'APPROVED' },
      include: {
        role: {
          include: {
            permissions: { include: { permission: true } },
          },
        },
      },
    });

    const perms = new Set<string>();
    for (const a of assignments) {
      for (const rp of a.role.permissions) {
        perms.add(rp.permission.key);
      }
    }
    return perms;
  }

  async hasPermission(user: AuthUser, key: string): Promise<boolean> {
    const perms = await this.getEffectivePermissions(user);
    return perms.has(key);
  }
}
