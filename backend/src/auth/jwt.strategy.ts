import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccountStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { PermissionsService } from '../common/services/permissions.service';
import { AuthUser } from '../common/types/auth-user';

interface JwtPayload {
  sub: string;
  email: string;
  isOwner: boolean;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    private readonly prisma: PrismaService,
    private readonly permissionsService: PermissionsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies?.access_token ?? null,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_ACCESS_SECRET') ?? 'dev-access-secret',
    });
  }

  async validate(payload: JwtPayload): Promise<AuthUser> {
    if (payload.isOwner) {
      const ownerUser = await this.permissionsService.ensureOwnerUser(
        payload.email,
      );
      return {
        id: ownerUser.id,
        email: payload.email,
        name: ownerUser.name ?? 'Owner',
        accountStatus: AccountStatus.ACTIVE,
        isOwner: true,
      };
    }

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });
    if (!user || user.accountStatus === AccountStatus.DISABLED) {
      throw new UnauthorizedException('Account disabled or not found');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      accountStatus: user.accountStatus,
      isOwner: this.permissionsService.isOwner(user.email),
    };
  }
}
