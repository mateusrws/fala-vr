import { Injectable } from "@nestjs/common";
import { UserSchema, User } from "../../entities/User.js";
import { UserRepository } from "../../repositories/userRepository.js";
import { ifUserExistById } from "../../utils/ifUserExist.js";

@Injectable()
export class UpdateUserUseCase{
    constructor(private userRepository: UserRepository){}

    async execute(user_id: string, user_data: UserSchema){
        const user = new User(user_data, user_id);
        if(await ifUserExistById(this.userRepository, user_id)){
            return this.userRepository.update(user);
        }
    }
}