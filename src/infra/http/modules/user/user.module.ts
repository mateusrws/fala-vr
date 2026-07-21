import { Module } from "@nestjs/common";
import { CreateUserUseCase } from "../../../../modules/User/useCases/createUser/createUserUseCase.js";
import { DeleteUserUseCase } from "../../../../modules/User/useCases/deleteUser/deleteUserUseCase.js";
import { GetUserUseCase } from "../../../../modules/User/useCases/getUser/getUserUseCase.js";
import { UpdateUserUseCase } from "../../../../modules/User/useCases/updateUser/updateUserUseCase.js";
import { DatabaseModule } from "../../../database/database.module.js";
import { UserController } from "./user.controller.js";
import { UserRepository } from "../../../../modules/User/repositories/userRepository.js";

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [ CreateUserUseCase, GetUserUseCase, UpdateUserUseCase, DeleteUserUseCase],
  exports: [],
})

export class UserModule {}