import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service.js';
import { PrismaUserRepository } from './prisma/repositories/PrismaUserRepository.js';
import { UserRepository } from '../../modules/User/repositories/userRepository.js';

@Module({
  imports: [],
  controllers: [],
  providers: [
    PrismaService,
    { provide: UserRepository, useClass: PrismaUserRepository },
  ],
  exports: [UserRepository],
})
export class DatabaseModule {}