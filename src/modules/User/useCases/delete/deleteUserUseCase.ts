import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../repositories/userRepository.js";
import { ifUserExistById } from "../../utils/ifUserExist.js";

@Injectable()
export class DeleteUserUseCase{
    constructor(private userRepository: UserRepository){}

    async execute(userId: string){
        if(await ifUserExistById(this.userRepository, userId)){
            return this.userRepository.delete(userId);
        }
    }
}