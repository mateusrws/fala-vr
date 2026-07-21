import { Injectable } from "@nestjs/common";
import { userRepository } from "../../repositories/userRepository";

@Injectable()
export class GetUserUseCase{
    constructor(private userRepository: userRepository){}

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