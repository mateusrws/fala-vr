import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserRepository } from '../../User/repositories/userRepository.js';
import { User as DomainUser } from '../../User/entities/User.js';
import { Role } from '../../User/types/Roles.enum.js';

interface ValidateUserRequest {
  email: string;
  password: string;
}

@Injectable()
export class ValidateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, password }: ValidateUserRequest) {
    const userRaw = await this.userRepository.getByEmail(email);

    if (!userRaw) throw new UnauthorizedException('Email ou senha incorretos');

    const user = new DomainUser(
      {
        name: userRaw.name,
        email: userRaw.email,
        password: userRaw.password ?? '',
        img_url: userRaw.img_url ?? '',
        role: userRaw.role as Role,
        createdAt: new Date(),
      },
      userRaw.id,
    );

    const isMatchPass = await compare(password, user.get_password);

    if (!isMatchPass)
      throw new UnauthorizedException('Email ou senha incorretos');

    return user;
  }
}
