import { Module } from "@nestjs/common";
import { CreatePostUseCase } from "../../../../modules/Post/useCases/create/createPostUseCase.js";
import { DeletePostUseCase } from "../../../../modules/Post/useCases/delete/deletePostUseCase.js";
import { GetPostUseCase } from "../../../../modules/Post/useCases/get/getPostUseCase.js";
import { UpdatePostUseCase } from "../../../../modules/Post/useCases/update/updatePostUseCase.js";
import { DatabaseModule } from "../../../database/database.module.js";
import { PostController } from "./post.controller.js";
@Module({
  imports: [DatabaseModule],
  controllers: [PostController],
  providers: [ CreatePostUseCase, GetPostUseCase, UpdatePostUseCase, DeletePostUseCase],
  exports: [],
})

export class PostModule {}