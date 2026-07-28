import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SignInUseCase } from '../../../../modules/auth/useCases/SignInUseCase.js';
import { Public } from './decorator/isPublic.js';

@Controller("/signin")
export class AuthController {
  constructor(private singInUseCase: SignInUseCase) {}
  @Post('')
  @HttpCode(HttpStatus.OK)
  @Public()
  async signIn(@Request() request: any) {

    const access_token = await this.singInUseCase.execute({
      email: request.body.email,
      password: request.body.password
    });

    return { access_token};
  }
}
