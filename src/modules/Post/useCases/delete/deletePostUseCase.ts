import { Injectable } from '@nestjs/common';
import { PostRepository } from '../../repositories/postRepository.js';
import { ifPostExistById } from '../../utils/ifPostExist.js';

@Injectable()
export class DeletePostUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(postId: string) {
    if (await ifPostExistById(this.postRepository, postId)) {
      return this.postRepository.delete(postId);
    }
  }
}
