// owner.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_OWNER_KEY } from './is-owner-post.decorator.js';
import { PrismaPostRepository } from '../../../../database/prisma/repositories/PrismaPostRepository.js';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private postRepository: PrismaPostRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
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

    const post = await this.postRepository.getById(String(params.id));

    if (!post) {
      return false;
    }

    if (!user) {
      return false;
    }

    if (user.role === 'admin') {
      return true;
    }

    const currentUserId = String(user.userId || user.id);
    const resourceId = String(post.get_id);

    if (currentUserId !== resourceId) {
      throw new ForbiddenException(
        'Você não tem permissão para alterar o recurso de outro usuário.',
      );
    }

    return true;
  }
}
