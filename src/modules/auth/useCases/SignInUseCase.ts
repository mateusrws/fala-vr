import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../../User/entities/User.js";
import { UserPayload } from "../models/userPayload.js";

interface SignInRequest {
    user: User;
}

@Injectable()
export class SignInUseCase {
    constructor(private jwtService: JwtService) { }
    async execute({ user }: SignInRequest) {
        const payload: UserPayload = {
            sub: user.get_id,
            email: user.get_email,
            name: user.get_name,
        };

        const jwtToken = this.jwtService.sign(payload)
        return jwtToken;
    }
}