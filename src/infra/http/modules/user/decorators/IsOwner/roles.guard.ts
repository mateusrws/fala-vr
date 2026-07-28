// owner.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_OWNER_KEY } from './is-owner.decorator.js';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isOwnerRequired = this.reflector.getAllAndOverride<boolean>(
      IS_OWNER_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!isOwnerRequired) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const params = request.params;

    if (!user) {
      return false;
    }

    if (user.role === 'admin') {
      return true;
    }

    const currentUserId = String(user.userId || user.id);
    const resourceId = String(params.id);

    if (currentUserId !== resourceId) {
      throw new ForbiddenException(
        'Você não tem permissão para alterar o recurso de outro usuário.',
      );
    }

    return true;
  }
}
