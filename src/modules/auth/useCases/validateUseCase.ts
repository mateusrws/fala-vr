import { Injectable, UnauthorizedException } from "@nestjs/common";
import { compare } from "bcrypt";
import { UserRepository } from "../../User/repositories/userRepository.js";
import { PrismaUserMapper } from "../../../infra/database/prisma/mappers/PrismaUserMapper.js";

interface ValidateUserRequest {
    email: string,
    password: string
}

@Injectable()
export class ValidateUserUseCase {
    constructor(private userRepository: UserRepository) { }

    async execute({ email, password }: ValidateUserRequest) {

        const userRaw = await this.userRepository.getByEmail(email)

        const user = PrismaUserMapper.toDomainOne(userRaw)

        if (!user) throw new UnauthorizedException("Email ou senha incorretos")

        const isMatchPass = await compare(password, user.get_password)

        if (!isMatchPass) throw new UnauthorizedException("Email ou senha incorretos")

        return user;
    }
}