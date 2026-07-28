import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserSchema, User } from '../../entities/User.js';
import { UserRepository } from '../../repositories/userRepository.js';
import { ifUserExistById } from '../../utils/ifUserExist.js';
import { Multer } from 'multer';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class UpdateUserUseCase {
  private readonly supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!,
  );

  constructor(private userRepository: UserRepository) {}

  async execute(user_id: string, user_data: UserSchema) {
    const user = new User(user_data, user_id);
    if (await ifUserExistById(this.userRepository, user_id)) {
      return this.userRepository.update(user);
    }
  }

  async uploadPicProfile(user_id: string, file: Express.Multer.File) {
    if (!file) throw new BadRequestException('Arquivo não fornecido.');

    if (!user_id) throw new BadRequestException('ID não fornecido.');

    if (!(await ifUserExistById(this.userRepository, user_id)))
      throw new BadRequestException('Usuário não existe.');

    const user = await this.userRepository.getCompleteUser(user_id);

    if (!user) throw new BadRequestException('Usuário não existe.');

    const extension = file.originalname.split('.').pop()?.trim().toLowerCase();

    if (!extension)
      throw new BadRequestException('Arquivo sem extensão válida.');

    const fileName = `${user_id}-avatar.${extension}`;

    // ! TIRAR DEPOIS DE TESTADO
    console.log('📤 Uploading to Supabase:', {
      bucket: 'PicProfile',
      fileName: fileName,
      userId: user_id,
      mimetype: file.mimetype,
      size: file.size,
    });

    const { data, error } = await this.supabase.storage
      .from('PicProfile')
      .upload(fileName, file.buffer, {
        upsert: true,
        contentType: file.mimetype,
      });

    if (error) {
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
      .from('Images')
      .getPublicUrl(fileName);

    user.set_img_url = publicUrlData.publicUrl;

    const putUser = await this.userRepository.update(user);
  }
}
