import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../../../../modules/User/repositories/userRepository.js';
import { User as DomainUser, type UserSchema } from '../../../../modules/User/entities/User.js';
import { ResponseUserDto } from '../../../http/modules/user/dto/ResponseUserDto.js';
import { PrismaUserMapper } from '../mappers/PrismaUserMapper.js';
import { PrismaService } from '../prisma.service.js';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}


  async getCompleteUserByEmail(user_email: string): Promise<DomainUser | null> {
    if (!user_email) throw new BadRequestException('User email is required');

    const userRaw = await this.prisma.user.findUnique({
      where: { email: user_email },
    });

    if (!userRaw) throw new NotFoundException("Usuário não encontrado!");
    ;

    return PrismaUserMapper.toDomainOne(userRaw);
  }



  async getCompleteUser(user_id: string): Promise<DomainUser | null> {
    if (!user_id) throw new BadRequestException('User ID is required');

    const userRaw = await this.prisma.user.findUnique({
      where: { id: user_id },
    });

    if (!userRaw) throw new NotFoundException("Usuário não encontrado!");

    return PrismaUserMapper.toDomainOne(userRaw);
  }

  async create(user: DomainUser): Promise<void> {
    const userRaw = PrismaUserMapper.toPrisma(user);

    await this.prisma.user.create({ data: userRaw });
  }
  async getAll(): Promise<ResponseUserDto[]> {
    try {
      const usersRaw = await this.prisma.user.findMany();
      const res = PrismaUserMapper.toDomain(usersRaw);
      const dataRes: ResponseUserDto[] = [];
      res.map((user) => {
        dataRes.push({
          id: user.get_id,
          name: user.get_name,
          email: user.get_email,
          img_url: user.get_img_url,
          role: user.get_role,
          password: user.get_password,
        });
      });
      return dataRes;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar usuários');
    }
  }
  async getById(id: string): Promise<ResponseUserDto | null> {
    const userRaw = await this.prisma.user.findUnique({ where: { id } });

    if (!userRaw) throw new NotFoundException('Usuário não encontrado!');

    const user = PrismaUserMapper.toDomainOne(userRaw);

    const res: ResponseUserDto = {
      id: user.get_id,
      name: user.get_name,
      email: user.get_email,
      img_url: user.get_img_url,
      role: user.get_role,
    };
    return res;
  }


  async getByEmail(email: string): Promise<ResponseUserDto | null> {
    const userRaw = await this.prisma.user.findUnique({ where: { email } });

    if (!userRaw) throw new NotFoundException("Usuário não encontrado!");;

    const user = PrismaUserMapper.toDomainOne(userRaw);
    const res: ResponseUserDto = {
      id: user.get_id,
      name: user.get_name,
      email: user.get_email,
      img_url: user.get_img_url,
      role: user.get_role,
      password: user.get_password,
    };
    return res;
  }


  async update(user: DomainUser): Promise<void> {
    try {
      const userRaw = PrismaUserMapper.toPrisma(user);

      if (!userRaw.id) throw new BadRequestException('User ID is required for update');
      
      await this.prisma.user.update({ where: { id: userRaw.id }, data: userRaw });
    } catch (error) {
      throw new InternalServerErrorException('Erro ao alterar usuário');
    }
  }
  async delete(id: string): Promise<void> {
    if (!id) throw new BadRequestException('User ID is required for delete');

    await this.prisma.user.delete({ where: { id } });
  }
}
