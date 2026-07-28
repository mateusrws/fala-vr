import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  Request
} from '@nestjs/common';
import { CreatePostUseCase } from '../../../../modules/Post/useCases/create/createPostUseCase.js';
import { DeletePostUseCase } from '../../../../modules/Post/useCases/delete/deletePostUseCase.js';
import { GetPostUseCase } from '../../../../modules/Post/useCases/get/getPostUseCase.js';
import { UpdatePostUseCase } from '../../../../modules/Post/useCases/update/updatePostUseCase.js';
import { PatternPostRequestDto } from './dto/PatternPostRequestDto.js';
import { IsOwnerPost } from './IsOwnerPost/is-owner-post.decorator.js';
import { IsOwner } from '../user/decorators/IsOwner/is-owner.decorator.js';
import { FileInterceptor } from '@nestjs/platform-express';
import { getUserId } from '../../../../utils/getUserIdFromToken.js';

@Controller('posts')
export class PostController {
  constructor(
    private createPostUseCase: CreatePostUseCase,
    private getPostUseCase: GetPostUseCase,
    private updatePostUseCase: UpdatePostUseCase,
    private deletePostUseCase: DeletePostUseCase,
  ) {}

  @Post('')
  async createUser(@Body() body: PatternPostRequestDto) {
    const { title, content, authorId, uppoints, downpoints, father_post_id } =
      body;
    const user = await this.createPostUseCase.execute({
      title,
      content,
      authorId,
      uppoints,
      downpoints,
      father_post_id,
    });
    return user;
  }

  @IsOwnerPost()
  @Get('/:post_id')
  async getPost(@Param('post_id') post_id: string) {
    return this.getPostUseCase.getById(post_id);
  }

  @Get()
  async getPosts() {
    return this.getPostUseCase.getAll();
  }

  @IsOwnerPost()
  @Put('/:post_id')
  async updateUser(
    @Param('post_id') post_id: string,
    @Body() body: PatternPostRequestDto,
  ) {
    const { title, content, authorId, uppoints, downpoints, father_post_id } =
      body;
    return this.updatePostUseCase.execute(post_id, {
      title,
      content,
      authorId,
      uppoints,
      downpoints,
      father_post_id,
    });
  }

  @IsOwnerPost()
  @Delete('/:post_id')
  async deleteUser(@Param('post_id') post_id: string) {
    return this.deletePostUseCase.execute(post_id);
  }
  
  @IsOwner()
  @Patch('/:post_id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: any, @Request() request: any, @Param('post_id') post_id: string) {
    if (!file) {
      return {
        success: false,
        message: 'No file uploaded',
      };
    }

    const user_id = getUserId(request.headers.authorization);

    this.updatePostUseCase.uploadImage(post_id, user_id, file);
    }
}
