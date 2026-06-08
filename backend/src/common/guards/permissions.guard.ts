import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ANY_PERMISSIONS_KEY } from '../decorators/require-any-permissions.decorator';
import { PERMISSIONS_KEY } from '../decorators/require-permissions.decorator';
import { PermissionsService } from '../services/permissions.service';
import { AuthUser } from '../types/auth-user';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private permissionsService: PermissionsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const required = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const anyRequired = this.reflector.getAllAndOverride<string[]>(
      ANY_PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!required?.length && !anyRequired?.length) return true;

    const user = context.switchToHttp().getRequest().user as AuthUser;
    if (!user) throw new ForbiddenException();

    if (user.isOwner) return true;

    const effective = await this.permissionsService.getEffectivePermissions(user);

    if (anyRequired?.length) {
      const hasAny = anyRequired.some((p) => effective.has(p));
      if (!hasAny) throw new ForbiddenException('Insufficient permissions');
      return true;
    }

    const hasAll = required!.every((p) => effective.has(p));
    if (!hasAll) throw new ForbiddenException('Insufficient permissions');
    return true;
  }
}
