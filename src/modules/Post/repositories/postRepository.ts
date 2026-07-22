import { PatternPostResponseDto } from "../../../infra/http/modules/post/dto/PatternPostResponseDto.js";
import { Post, PostSchema } from "../entities/Post.js";


export abstract class PostRepository {
    abstract create(post: PostSchema): Promise<void>;
    abstract getAll(): Promise<PatternPostResponseDto[]>;
    abstract getById(id: string): Promise<PatternPostResponseDto | null>;
    abstract getByFatherPostId(father_post_id: string): Promise<PatternPostResponseDto[] | null>;
    abstract getByAuthorId(authorId: string): Promise<PatternPostResponseDto[] | null>;
    abstract getByObject(post: PostSchema): Promise<PatternPostResponseDto | null>;
    abstract update(post: Post): Promise<void>;
    abstract delete(id: string): Promise<void>;
}