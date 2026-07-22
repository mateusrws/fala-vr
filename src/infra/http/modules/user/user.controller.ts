import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateUserUseCase } from "../../../../modules/User/useCases/create/createUserUseCase.js";
import { DeleteUserUseCase } from "../../../../modules/User/useCases/delete/deleteUserUseCase.js";
import { GetUserUseCase } from "../../../../modules/User/useCases/get/getUserUseCase.js";
import { UpdateUserUseCase } from "../../../../modules/User/useCases/update/updateUserUseCase.js";
import { PatternUserRequestDto } from "./dto/PatternUserRequestDto.js";

    
@Controller('user')
export class UserController {

    constructor(private createUserUseCase: CreateUserUseCase, private getUserUseCase: GetUserUseCase, private updateUserUseCase: UpdateUserUseCase, private deleteUserUseCase: DeleteUserUseCase) { }
    
    @Post('')
    async createUser(@Body() body: PatternUserRequestDto) {
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
    async updateUser(@Param('user_id') user_id: string, @Body() body: PatternUserRequestDto) {
        const { name, email, password, role } = body
        return this.updateUserUseCase.execute(user_id, { name, email, password, role })
    }

    @Delete("/:user_id")
    async deleteUser(@Param("user_id") user_id: string) {
        return this.deleteUserUseCase.execute(user_id)
    }
}