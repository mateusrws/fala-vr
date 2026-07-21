import { Injectable } from "@nestjs/common";
import { userRepository } from "../../repositories/userRepository";
import { ifUserExistById } from "../../utils/ifUserExist";

@Injectable()
export class DeleteUserUseCase{
    constructor(private userRepository: userRepository){}

    async execute(userId: string){
        if(await ifUserExistById(this.userRepository, userId)){
            return this.userRepository.delete(userId);
        }
    }
}