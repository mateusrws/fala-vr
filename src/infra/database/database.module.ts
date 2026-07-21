import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaUserRepository } from './prisma/repositories/PrismaUserRepository';

export const userRepository = 'UserRepository';

@Module({
  imports: [],
  controllers: [],
  providers: [
    PrismaService,
    { provide: userRepository, useClass: PrismaUserRepository },
  ],
  exports: [userRepository],
})
export class DatabaseModule {}