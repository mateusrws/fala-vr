import { Post as PostRaw } from '../../../../generated/prisma/client';
import { Post, PostSchema } from '../../../../modules/Post/entities/Post.js';
import { PatternPostResponseDto } from '../../../http/modules/post/dto/PatternPostResponseDto.js';

export class PrismaPostMapper {
  static toPrisma(post: PostSchema): PostRaw {
    const data = new Post({
      title: post.title,
      content: post.content,
      authorId: post.authorId,
      uppoints: post.uppoints,
      downpoints: post.downpoints,
      father_post_id: post.father_post_id,
    });
    return {
      id: data.get_id,
      title: data.get_title,
      content: data.get_content,
      authorId: data.get_authorId,
      uppoints: data.get_uppoints,
      downpoints: data.get_downpoints,
      father_post_id: data.get_father_post_id,
      createdAt: data.get_createdAt!,
    };
  }
  static toDomain(posts: PostRaw[]): Post[] {
    return posts.map((post) =>
      Post.reconstitute(
        {
          title: post.title,
          content: post.content,
          authorId: post.authorId,
          uppoints: post.uppoints,
          downpoints: post.downpoints,
          father_post_id: post.father_post_id!,
        },
        post.id,
      ),
    );
  }
  static toDomainOne(post: PostRaw): Post {
    return Post.reconstitute(
      {
        title: post.title,
        content: post.content,
        authorId: post.authorId,
        uppoints: post.uppoints,
        downpoints: post.downpoints,
        father_post_id: post.father_post_id!,
      },
      post.id,
    );
  }

  static toPatternResponseOne(post: Post): PatternPostResponseDto {
    return {
      id: post.get_id,
      title: post.get_title,
      content: post.get_content,
      authorId: post.get_authorId,
      createdAt: post.get_createdAt!,
      uppoints: post.get_uppoints,
      downpoints: post.get_downpoints,
      father_post_id: post.get_father_post_id!,
    };
  }
  static toPatternResponseMany(posts: Post[]): PatternPostResponseDto[] {
    const raw: PatternPostResponseDto[] = [];
    posts.map((p) =>
      raw.push({
        id: p.get_id,
        title: p.get_title,
        content: p.get_content,
        authorId: p.get_authorId,
        createdAt: p.get_createdAt!,
        uppoints: p.get_uppoints,
        downpoints: p.get_downpoints,
        father_post_id: p.get_father_post_id!,
      }),
    );
    return raw;
  }
}
