import { Injectable } from '@nestjs/common';
import { User, UserSchema } from '../../entities/User.js';
import { UserRepository } from '../../repositories/userRepository.js';
import { ifUserExistByEmail } from '../../utils/ifUserExist.js';

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(user: UserSchema) {
    if (!(await ifUserExistByEmail(this.userRepository, user.email))) {
      const userClass = new User(user)
      return this.userRepository.create(userClass);
    }
  }
}
