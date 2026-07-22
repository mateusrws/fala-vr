import { Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { SignInUseCase } from "../../../../modules/auth/useCases/SignInUseCase.js";
import { Public } from "./decorator/isPublic.js";
import { LocalAuthGuard } from "./guards/LocalAuth.guard.js";


@Controller()
export class AuthController {
    constructor(private singInUseCase: SignInUseCase) { }
    @Post('signin')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    @Public()
    async signIn(@Request() request: any) {
        const access_token = await this.singInUseCase.execute({ user: request.user });

        return { access_token }
    }
}