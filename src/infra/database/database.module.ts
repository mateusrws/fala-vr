import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service.js';
import { PrismaUserRepository } from './prisma/repositories/PrismaUserRepository.js';
import { UserRepository } from '../../modules/User/repositories/userRepository.js';
import { PostRepository } from '../../modules/Post/repositories/postRepository.js';
import { PrismaPostRepository } from './prisma/repositories/PrismaPostRepository.js';

@Module({
  imports: [],
  controllers: [],
  providers: [
    PrismaService,
    { provide: UserRepository, useClass: PrismaUserRepository },
    { provide: PostRepository, useClass: PrismaPostRepository },
  ],
  exports: [UserRepository, PostRepository],
})
export class DatabaseModule {}
