import { Injectable } from "@nestjs/common";
import { userRepository } from "../../repositories/userRepository";
import { User, UserSchema } from "../../entities/User";
import { ifUserExistById } from "../../utils/ifUserExist";

@Injectable()
export class UpdateUserUseCase{
    constructor(private userRepository: userRepository){}

    async execute(user_id: string, user_data: UserSchema){
        const user = new User(user_data, user_id);
        if(await ifUserExistById(this.userRepository, user_id)){
            return this.userRepository.update(user);
        }
    }
}