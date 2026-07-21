import { Injectable } from "@nestjs/common";
import { userRepository } from "../../repositories/userRepository";
import { UserSchema } from "../../entities/User";
import { ifUserExistByEmail } from "../../utils/ifUserExist";

@Injectable()
export class CreateUserUseCase{
    constructor(private userRepository: userRepository){}

    async execute(user: UserSchema){
        if(!await ifUserExistByEmail(this.userRepository, user.email)){
            return this.userRepository.create(user);
        }
    }
}