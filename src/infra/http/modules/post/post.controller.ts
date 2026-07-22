import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreatePostUseCase } from "../../../../modules/Post/useCases/create/createPostUseCase.js";
import { DeletePostUseCase } from "../../../../modules/Post/useCases/delete/deletePostUseCase.js";
import { GetPostUseCase } from "../../../../modules/Post/useCases/get/getPostUseCase.js";
import { UpdatePostUseCase } from "../../../../modules/Post/useCases/update/updatePostUseCase.js";
import { PatternPostRequestDto } from "./dto/PatternPostRequestDto.js";
import { IsOwnerPost } from "./IsOwnerPost/is-owner-post.decorator.js";
    
@Controller('posts')
export class PostController {

    constructor(private createPostUseCase: CreatePostUseCase, private getPostUseCase: GetPostUseCase, private updatePostUseCase: UpdatePostUseCase, private deletePostUseCase: DeletePostUseCase) { }
    
    @Post('')
    async createUser(@Body() body: PatternPostRequestDto) {
        const { title, content, authorId, uppoints, downpoints, father_post_id } = body
        const user = await this.createPostUseCase.execute({ title, content, authorId, uppoints, downpoints, father_post_id })
        return user
    }

    @IsOwnerPost()
    @Get('/:post_id')
    async getUser(@Param('post_id') post_id: string) {
        return this.getPostUseCase.getById(post_id)
    }


    @Get()
    async getPosts() {
        return this.getPostUseCase.getAll()
    }

    @IsOwnerPost()
    @Put("/:post_id")
    async updateUser(@Param('post_id') post_id: string, @Body() body: PatternPostRequestDto) {
        const { title, content, authorId, uppoints, downpoints, father_post_id } = body
        return this.updatePostUseCase.execute(post_id, { title, content, authorId, uppoints, downpoints, father_post_id })
    }

    @IsOwnerPost()
    @Delete("/:post_id")
    async deleteUser(@Param("post_id") post_id: string) {
        return this.deletePostUseCase.execute(post_id)
    }
}