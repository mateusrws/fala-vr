import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PostRepository } from '../../repositories/postRepository.js';
import { Post, PostSchema } from '../../entities/Post.js';
import { ifPostExistById } from '../../utils/ifPostExist.js';
import { createClient } from '@supabase/supabase-js';
import { ifUserExistById } from '../../../User/utils/ifUserExist.js';

@Injectable()
export class UpdatePostUseCase {

  private readonly supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!,
  );

  constructor(private postRepository: PostRepository) {}

  async execute(post_id: string, post_data: PostSchema) {
    const post = new Post(post_data, post_id);
    if (await ifPostExistById(this.postRepository, post_id)) {
      return this.postRepository.update(post);
    }
  }

  async uploadImage(post_id: string, user_id: string, file: Express.Multer.File){
    if (!file) throw new BadRequestException('Arquivo não fornecido.');
    
    if (!post_id) throw new BadRequestException('ID do Post não fornecido.');

    if (!user_id) throw new BadRequestException('ID do Usuário não fornecido.');

    if (!(await ifPostExistById(this.postRepository, post_id))) throw new BadRequestException('Post não existe.');

    const post = await this.postRepository.getById(post_id);

    if (!post) throw new BadRequestException('Post não existe.');

    const extension = file.originalname.split('.').pop()?.trim().toLowerCase();

    if (!extension)
      throw new BadRequestException('Arquivo sem extensão válida.');

    const fileName = `${post_id}-avatar.${extension}`;

    // ! TIRAR DEPOIS DE TESTADO
    console.log('📤 Uploading to Supabase:', {
      bucket: 'PostImage',
      fileName: fileName,
      userId: post_id,
      mimetype: file.mimetype,
      size: file.size,
    });

    const { data, error } = await this.supabase.storage
    .from('PostImage')
    .upload(fileName, file.buffer, {
      upsert: true,
      contentType: file.mimetype,
    });

    if(error){
      // ! TIRAR DEPOIS DE TESTADO
      console.error('❌ Erro detalhado do Supabase:', error);

      if (
        error.statusCode === 'PGRST125' ||
        error.message.includes('Invalid path')
      ) {
        throw new InternalServerErrorException(
          'Bucket "Images" não existe no Supabase Storage. ' +
            'Por favor, crie o bucket manualmente no painel do Supabase: ' +
            'Storage → New Bucket → Nome: "Images" → Public: Yes',
        );
      }

      throw new InternalServerErrorException(
        `Erro ao fazer upload: ${error.message}`,
      );
    }

    // ! TIRAR DEPOIS DE TESTADO
    console.log('✅ Upload bem-sucedido:', data);

    const { data: publicUrlData } = this.supabase.storage
      .from('PostImage')
      .getPublicUrl(fileName);

    post.set_img_url = publicUrlData.publicUrl;

    await this.postRepository.update(post);
  }
}
