import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module.js';
import { UserModule } from './infra/http/modules/user/user.module.js';
import { PostModule } from './infra/http/modules/post/post.module.js';
import { AuthModule } from './infra/http/modules/auth/auth.module.js';
@Module({
  imports: [DatabaseModule, UserModule, PostModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
