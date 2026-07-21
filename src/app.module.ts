import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module.js';
import { UserModule } from './infra/http/modules/user/user.module.js';
@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
