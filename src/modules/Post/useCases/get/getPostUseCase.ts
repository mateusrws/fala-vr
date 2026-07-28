import { Injectable } from '@nestjs/common';
import { PostRepository } from '../../repositories/postRepository.js';
import { PostSchema } from '../../entities/Post.js';

@Injectable()
export class GetPostUseCase {
  constructor(private postRepository: PostRepository) {}

  async getAll() {
    return this.postRepository.getAll();
  }

  async getByFatherPostId(father_post_id: string) {
    return this.postRepository.getByFatherPostId(father_post_id);
  }

  async getById(id: string) {
    return this.postRepository.getById(id);
  }
  async getByAuthorId(author_id: string) {
    return this.postRepository.getByAuthorId(author_id);
  }
  async getByObject(post: PostSchema) {
    return this.postRepository.getByObject(post);
  }
}
