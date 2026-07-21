import { Body, Controller, Delete, Get, Param, Post, Put, Request } from "@nestjs/common";
import { CreateUserUseCase } from "../../../../modules/User/useCases/createUser/createUserUseCase";
import { GetUserUseCase } from "../../../../modules/User/useCases/getUser/getUserUseCase";
import { UpdateUserUseCase } from "../../../../modules/User/useCases/updateUser/updateUserUseCase";
import { DeleteUserUseCase } from "../../../../modules/User/useCases/deleteUser/deleteUserUseCase";
import type { UserSchema } from "../../../../modules/User/entities/User";

    
@Controller('user')
export class UserController {

    constructor(private createUserUseCase: CreateUserUseCase, private getUserUseCase: GetUserUseCase, private updateUserUseCase: UpdateUserUseCase, private deleteUserUseCase: DeleteUserUseCase) { }
    
    @Post('')
    async createUser(@Body() body: UserSchema) {
        const { name, email, password, role } = body
        const user = await this.createUserUseCase.execute({ name, email, password, role })
        return user
    }

    @Get('/:user_id')
    async getUser(@Param('user_id') user_id: string) {
        return this.getUserUseCase.getById(user_id)
    }

    @Get()
    async getUsers() {
        return this.getUserUseCase.getAll()
    }

    @Put("/:user_id")
    async updateUser(@Param('user_id') user_id: string, @Body() body: UserSchema) {
        const { name, email, password, role } = body
        return this.updateUserUseCase.execute(user_id, { name, email, password, role })
    }

    @Delete("/:user_id")
    async deleteUser(@Param("user_id") user_id: string) {
        return this.deleteUserUseCase.execute(user_id)
    }
}