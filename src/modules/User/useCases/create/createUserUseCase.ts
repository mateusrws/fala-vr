import { Injectable } from "@nestjs/common";
import { UserSchema } from "../../entities/User.js";
import { UserRepository } from "../../repositories/userRepository.js";
import { ifUserExistByEmail } from "../../utils/ifUserExist.js";

@Injectable()
export class CreateUserUseCase{
    constructor(private userRepository: UserRepository){}

    async execute(user: UserSchema){
        if(!await ifUserExistByEmail(this.userRepository, user.email)){
            return this.userRepository.create(user);
        }
    }
}