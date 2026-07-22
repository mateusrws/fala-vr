import { Module } from "@nestjs/common";
import { CreateUserUseCase } from "../../../../modules/User/useCases/create/createUserUseCase.js";
import { DeleteUserUseCase } from "../../../../modules/User/useCases/delete/deleteUserUseCase.js";
import { GetUserUseCase } from "../../../../modules/User/useCases/get/getUserUseCase.js";
import { UpdateUserUseCase } from "../../../../modules/User/useCases/update/updateUserUseCase.js";
import { DatabaseModule } from "../../../database/database.module.js";
import { UserController } from "./user.controller.js";

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [ CreateUserUseCase, GetUserUseCase, UpdateUserUseCase, DeleteUserUseCase],
  exports: [],
})

export class UserModule {}