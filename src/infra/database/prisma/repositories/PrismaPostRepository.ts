import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PostRepository } from '../../../../modules/Post/repositories/postRepository.js';
import { Post, PostSchema } from '../../../../modules/Post/entities/Post.js';
import { PrismaService } from '../prisma.service.js';
import { PatternPostRequestDto } from '../../../http/modules/post/dto/PatternPostRequestDto.js';
import { PrismaPostMapper } from '../mappers/PrismaPostMapper.js';
import { PatternPostResponseDto } from '../../../http/modules/post/dto/PatternPostResponseDto.js';

@Injectable()
export class PrismaPostRepository implements PostRepository {
  constructor(private prisma: PrismaService) {}

  async getByFatherPostId(
    father_post_id: string,
  ): Promise<PatternPostResponseDto[] | null> {
    const postRaw = await this.prisma.post.findMany({
      where: { father_post_id },
    });

    if (!postRaw) throw new NotFoundException('Post not found');

    const posts = PrismaPostMapper.toDomain(postRaw);

    return PrismaPostMapper.toPatternResponseMany(posts);
  }

  async getByAuthorId(
    authorId: string,
  ): Promise<PatternPostResponseDto[] | null> {
    const postRaw = await this.prisma.post.findMany({ where: { authorId } });

    if (!postRaw) throw new NotFoundException('Post not found');

    const posts = PrismaPostMapper.toDomain(postRaw);

    return PrismaPostMapper.toPatternResponseMany(posts);
  }

  async getByObject(post: PostSchema): Promise<PatternPostResponseDto | null> {
    const postRaw = await this.prisma.post.findFirst({
      where: {
        title: post.title,
        authorId: post.authorId,
        uppoints: post.uppoints,
        downpoints: post.downpoints,
        father_post_id: post.father_post_id,
      },
    });

    if (!postRaw) return null

    const posts = PrismaPostMapper.toDomainOne(postRaw);

    return PrismaPostMapper.toPatternResponseOne(posts);
  }

  async create(post: PatternPostRequestDto): Promise<void> {
    const postRaw = PrismaPostMapper.toPrisma(post);

    await this.prisma.post.create({ data: postRaw });
  }

  async getAll(): Promise<PatternPostResponseDto[]> {
    const postRaw = await this.prisma.post.findMany();
    const res = PrismaPostMapper.toDomain(postRaw);
    const dataRes: PatternPostResponseDto[] = [];
    res.map((post) => {
      dataRes.push({
        id: post.get_id,
        title: post.get_title,
        content: post.get_content,
        authorId: post.get_authorId,
        uppoints: post.get_uppoints,
        downpoints: post.get_downpoints,
        father_post_id: post.get_father_post_id!,
        createdAt: post.get_createdAt!,
      });
    });
    return dataRes;
  }

  async getById(id: string): Promise<Post | null> {
    const postRaw = await this.prisma.post.findUnique({ where: { id } });

    if (!postRaw) throw new NotFoundException('Post not found');

    const post = PrismaPostMapper.toDomainOne(postRaw);
    return post;
  }

  async update(post: Post): Promise<void> {
    if (!post.get_id) throw new BadRequestException('Post ID is required for update');

    if (!post) throw new BadRequestException('Post is required');

    const postRaw = PrismaPostMapper.toPrisma(post.get_props)

    await this.prisma.post.update({
      where: { id: post.get_id },
      data: postRaw,
    });
  }

  async delete(id: string): Promise<void> {
    if (!id) throw new BadRequestException('Post ID is required for delete');

    await this.prisma.post.delete({ where: { id } });
  }
}
