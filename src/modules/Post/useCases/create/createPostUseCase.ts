import { Injectable } from '@nestjs/common';
import { PostRepository } from '../../repositories/postRepository.js';
import { PostSchema } from '../../entities/Post.js';
import { ifPostExistByObject } from '../../utils/ifPostExist.js';

@Injectable()
export class CreatePostUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(post: PostSchema) {
    if (!(await ifPostExistByObject(this.postRepository, post))) {
      console.log(post)
      return this.postRepository.create(post);
    }
  }
}
