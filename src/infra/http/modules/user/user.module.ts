import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/infra/database/database.module";
import { UserController } from "./user.controller";
import { CreateUserUseCase } from "src/modules/User/useCases/createUser/createUserUseCase";
import { DeleteUserUseCase } from "src/modules/User/useCases/deleteUser/deleteUserUseCase";
import { GetUserUseCase } from "src/modules/User/useCases/getUser/getUserUseCase";
import { UpdateUserUseCase } from "src/modules/User/useCases/updateUser/updateUserUseCase";

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [CreateUserUseCase, GetUserUseCase, UpdateUserUseCase, DeleteUserUseCase],
  exports: [],
})

export class UserModule {}