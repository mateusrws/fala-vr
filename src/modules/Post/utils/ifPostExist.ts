import { PostSchema } from '../entities/Post.js';
import { PostRepository } from '../repositories/postRepository.js';

export function ifPostExistById(
  postRepository: PostRepository,
  id: string,
): Promise<boolean> {
  return postRepository.getById(id).then((post) => !!post);
}
export function ifPostExistByObject(
  postRepository: PostRepository,
  postRaw: PostSchema,
): Promise<boolean> {
  return postRepository.getByObject(postRaw).then((post) => !!post);
}
