import { MiddlewareConsumer, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from '../../../../modules/auth/strategies/local.strategy.js';
import { SignInUseCase } from '../../../../modules/auth/useCases/SignInUseCase.js';
import { ValidateUserUseCase } from '../../../../modules/auth/useCases/validateUseCase.js';
import { UserModule } from '../user/user.module.js';
import { AuthController } from './auth.controller.js';
import { SignInDTOValidateMiddleware } from './middleware/SignInDTOValidate.middlware.js';
import { DatabaseModule } from '../../../database/database.module.js';
import { JwtStrategy } from '../../../../modules/auth/strategies/jwt.strategy.js';

@Module({
  controllers: [AuthController],
  imports: [
    DatabaseModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: (process.env.JWT_EXPIRE as any) ?? '7d' },
    }),
  ],
  providers: [LocalStrategy, JwtStrategy, ValidateUserUseCase, SignInUseCase],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SignInDTOValidateMiddleware).forRoutes('/signin');
  }
}
