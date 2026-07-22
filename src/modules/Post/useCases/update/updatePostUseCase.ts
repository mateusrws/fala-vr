import { Injectable } from "@nestjs/common";
import { PostRepository } from "../../repositories/postRepository.js";
import { Post, PostSchema } from "../../entities/Post.js";
import { ifPostExistById } from "../../utils/ifPostExist.js";


@Injectable()
export class UpdatePostUseCase{
    constructor(private postRepository: PostRepository){}

    async execute(post_id: string, post_data: PostSchema){
        const post = new Post(post_data, post_id);
        if(await ifPostExistById(this.postRepository, post_id)){
            return this.postRepository.update(post);
        }
    }
}