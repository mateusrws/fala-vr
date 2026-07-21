import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../repositories/userRepository.js";

@Injectable()
export class GetUserUseCase{
    constructor(private userRepository: UserRepository){}

    async getAll(){
        return this.userRepository.getAll();
    }
    
    async getByEmail(email: string){
        return this.userRepository.getByEmail(email);
    }

    async getById(id: string){
        return this.userRepository.getById(id);
    }
}