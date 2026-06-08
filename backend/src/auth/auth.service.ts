import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AccountStatus } from '@prisma/client';
import { Response } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { PermissionsService } from '../common/services/permissions.service';
import { MailerService } from '../common/services/mailer.service';
import { PasswordService } from './password.service';
import { ttlToMs } from './token-ttl';
import { AuthUser } from '../common/types/auth-user';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
    private readonly permissions: PermissionsService,
    private readonly mailer: MailerService,
    private readonly password: PasswordService,
  ) {}

  async login(email: string, plainPassword: string, res: Response) {
    const normalized = email.toLowerCase().trim();
    const isOwner = this.permissions.isOwner(normalized);

    if (isOwner) {
      const ownerPassword = this.config.get<string>('OWNER_PASSWORD');
      if (!ownerPassword || plainPassword !== ownerPassword) {
        throw new UnauthorizedException('Invalid email or password');
      }

      const ownerUser = await this.permissions.ensureOwnerUser(normalized);

      const authUser: AuthUser = {
        id: ownerUser.id,
        email: normalized,
        name: ownerUser.name ?? 'Owner',
        accountStatus: AccountStatus.ACTIVE,
        isOwner: true,
      };

      this.setTokens(res, {
        sub: ownerUser.id,
        email: normalized,
        isOwner: true,
      });

      const perms = await this.permissions.getEffectivePermissions(authUser);
      return {
        user: await this.buildUserDto(authUser),
        permissions: Array.from(perms),
        mustChangePassword: false,
      };
    }

    const user = await this.prisma.user.findUnique({
      where: { email: normalized },
    });

    if (!user || user.accountStatus === AccountStatus.DISABLED) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (!user.passwordHash) {
      throw new UnauthorizedException(
        'No password set for this account. Ask an admin to resend your invite.',
      );
    }

    const valid = await this.password.verify(plainPassword, user.passwordHash);
    if (!valid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (user.accountStatus === AccountStatus.INVITED) {
      await this.prisma.user.update({
        where: { id: user.id },
        data: { accountStatus: AccountStatus.ACTIVE },
      });
    }

    const authUser: AuthUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      accountStatus: AccountStatus.ACTIVE,
      isOwner: false,
    };

    this.setTokens(res, {
      sub: user.id,
      email: user.email,
      isOwner: false,
    });

    const perms = await this.permissions.getEffectivePermissions(authUser);
    const dto = await this.buildUserDto(authUser);

    return {
      user: dto,
      permissions: Array.from(perms),
      mustChangePassword: user.mustChangePassword,
    };
  }

  async changePassword(
    user: AuthUser,
    currentPassword: string,
    newPassword: string,
  ) {
    if (user.isOwner) {
      throw new BadRequestException('Owner password is managed via environment');
    }

    const dbUser = await this.prisma.user.findUnique({
      where: { id: user.id },
    });
    if (!dbUser?.passwordHash) {
      throw new BadRequestException('Account has no password');
    }

    const valid = await this.password.verify(
      currentPassword,
      dbUser.passwordHash,
    );
    if (!valid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    const passwordHash = await this.password.hash(newPassword);
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        mustChangePassword: false,
        accountStatus: AccountStatus.ACTIVE,
      },
    });

    return { ok: true };
  }

  /** Set password for a new/invited user and email credentials. */
  async provisionUserPassword(email: string, name?: string) {
    const normalized = email.toLowerCase().trim();
    const tempPassword = this.password.generateTemporary();
    const passwordHash = await this.password.hash(tempPassword);

    const user = await this.prisma.user.findUnique({
      where: { email: normalized },
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        mustChangePassword: true,
      },
    });

    await this.mailer.sendAccountCredentials(normalized, tempPassword, name);
    return tempPassword;
  }

  async me(user: AuthUser) {
    const perms = await this.permissions.getEffectivePermissions(user);
    const userDto = await this.buildUserDto(user);

    let mustChangePassword = false;
    if (!user.isOwner) {
      const dbUser = await this.prisma.user.findUnique({
        where: { id: user.id },
      });
      mustChangePassword = dbUser?.mustChangePassword ?? false;
    }

    return {
      user: userDto,
      permissions: Array.from(perms),
      mustChangePassword,
    };
  }

  async refresh(req: { cookies?: Record<string, string> }, res: Response) {
    const refreshToken = req.cookies?.refresh_token;
    if (!refreshToken) throw new UnauthorizedException();

    let payload: { sub: string; email: string; isOwner: boolean };
    try {
      payload = this.jwt.verify(refreshToken, {
        secret:
          this.config.get<string>('JWT_REFRESH_SECRET') ??
          'dev-refresh-secret',
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (!payload.isOwner) {
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });
      if (!user || user.accountStatus === AccountStatus.DISABLED) {
        throw new UnauthorizedException();
      }
    }

    this.setTokens(res, payload);
    return { ok: true };
  }

  logout(res: Response) {
    res.clearCookie('access_token', { path: '/' });
    res.clearCookie('refresh_token', { path: '/' });
    return { ok: true };
  }

  private setTokens(
    res: Response,
    payload: { sub: string; email: string; isOwner: boolean },
  ) {
    const accessTtl = this.config.get<string>('ACCESS_TOKEN_TTL') ?? '15m';
    const refreshTtl = this.config.get<string>('REFRESH_TOKEN_TTL') ?? '90d';
    const isProd = this.config.get('NODE_ENV') === 'production';
    const accessMaxAge = ttlToMs(accessTtl, 15 * 60 * 1000);
    const refreshMaxAge = ttlToMs(refreshTtl, 90 * 24 * 60 * 60 * 1000);

    const accessToken = this.jwt.sign(payload, {
      secret:
        this.config.get<string>('JWT_ACCESS_SECRET') ?? 'dev-access-secret',
      expiresIn: accessTtl as `${number}${'s' | 'm' | 'h' | 'd'}`,
    });

    const refreshToken = this.jwt.sign(payload, {
      secret:
        this.config.get<string>('JWT_REFRESH_SECRET') ?? 'dev-refresh-secret',
      expiresIn: refreshTtl as `${number}${'s' | 'm' | 'h' | 'd'}`,
    });

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      path: '/',
      maxAge: accessMaxAge,
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      path: '/',
      maxAge: refreshMaxAge,
    });
  }

  private async buildUserDto(user: AuthUser) {
    if (user.isOwner) {
      const dbUser = await this.permissions.ensureOwnerUser(user.email);
      return {
        id: dbUser.id,
        email: user.email,
        name: dbUser.name ?? 'Owner',
        accountStatus: AccountStatus.ACTIVE,
        isOwner: true,
        mustChangePassword: false,
        createdAt: dbUser.createdAt.toISOString(),
        updatedAt: dbUser.updatedAt.toISOString(),
      };
    }

    const dbUser = await this.prisma.user.findUnique({
      where: { id: user.id },
    });
    return {
      id: user.id,
      email: user.email,
      name: dbUser?.name ?? null,
      accountStatus: dbUser?.accountStatus ?? user.accountStatus,
      isOwner: false,
      mustChangePassword: dbUser?.mustChangePassword ?? false,
      createdAt: dbUser?.createdAt.toISOString() ?? new Date().toISOString(),
      updatedAt: dbUser?.updatedAt.toISOString() ?? new Date().toISOString(),
    };
  }
}
