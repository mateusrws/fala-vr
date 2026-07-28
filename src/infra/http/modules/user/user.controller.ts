import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserUseCase } from '../../../../modules/User/useCases/create/createUserUseCase.js';
import { DeleteUserUseCase } from '../../../../modules/User/useCases/delete/deleteUserUseCase.js';
import { GetUserUseCase } from '../../../../modules/User/useCases/get/getUserUseCase.js';
import { UpdateUserUseCase } from '../../../../modules/User/useCases/update/updateUserUseCase.js';
import { PatternUserRequestDto } from './dto/PatternUserRequestDto.js';
import { Public } from '../auth/decorator/isPublic.js';
import { Role } from '../../../../modules/User/types/Roles.enum.js';
import { Roles } from './decorators/roles/roles.decoretor.js';
import { IsOwner } from './decorators/IsOwner/is-owner.decorator.js';
import { getUserId } from '../../../../utils/getUserIdFromToken.js';

@Controller('user')
export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getUserUseCase: GetUserUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Public()
  @Post('')
  async createUser(@Body() body: PatternUserRequestDto) {
    const { name, email, password, role, img_url } = body;
    const user = await this.createUserUseCase.execute({
      name,
      email,
      password,
      role,
      img_url,
    });
    return user;
  }

  @Roles(Role.USER)
  @Get('/:user_id')
  async getUser(@Param('user_id') user_id: string) {
    return this.getUserUseCase.getById(user_id);
  }

  @Roles(Role.ADMIN)
  @Get()
  async getUsers() {
    return this.getUserUseCase.getAll();
  }

  @IsOwner()
  @Put('/:user_id')
  async updateUser(
    @Param('user_id') user_id: string,
    @Body() body: PatternUserRequestDto,
  ) {
    const { name, email, password, role, img_url } = body;
    return this.updateUserUseCase.execute(user_id, {
      name,
      email,
      password,
      role,
      img_url,
    });
  }

  @IsOwner()
  @Delete('/:user_id')
  async deleteUser(@Param('user_id') user_id: string) {
    return this.deleteUserUseCase.execute(user_id);
  }

  @IsOwner()
  @Patch('')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPicProfile(@UploadedFile() file: any, @Request() request: any) {
    if (!file) {
      return {
        success: false,
        message: 'No file uploaded',
      };
    }

    const user_id = getUserId(request.headers.authorization);

    console.log(user_id)

    this.updateUserUseCase.uploadPicProfile(user_id, file);
  }
}
