import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { OWNER_ONLY_KEY } from '../decorators/owner-only.decorator';
import { AuthUser } from '../types/auth-user';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const ownerOnly = this.reflector.getAllAndOverride<boolean>(OWNER_ONLY_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!ownerOnly) return true;

    const user = context.switchToHttp().getRequest().user as AuthUser;
    if (!user?.isOwner) {
      throw new ForbiddenException('Owner access required');
    }
    return true;
  }
}
