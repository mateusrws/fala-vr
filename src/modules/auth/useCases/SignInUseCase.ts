import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from '../models/userPayload.js';
import { UserRepository } from '../../User/repositories/userRepository.js';

interface SignInRequest {
  email: string,
  password: string
}

@Injectable()
export class SignInUseCase {
  constructor(private jwtService: JwtService, private userRepository: UserRepository) {}
  async execute({ email, password }: SignInRequest) {

    const user = await this.userRepository.getCompleteUserByEmail(email)

    console.log(" A segui aparece o user do email: ", email)
    console.log(user)

    
    if (!user) {
      throw new Error("Not found User");
    }



    const payload: UserPayload = {
      sub: user.get_id,
      email: user.get_email,
      name: user.get_name,
    };

    const jwtToken = this.jwtService.sign(payload);
    return jwtToken;
  }
}
