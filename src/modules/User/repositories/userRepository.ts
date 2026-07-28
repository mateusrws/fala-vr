import { ResponseUserDto } from '../../../infra/http/modules/user/dto/ResponseUserDto.js';
import { User as DomainUser, type UserSchema } from '../entities/User.js';

export abstract class UserRepository {
  abstract create(user: DomainUser): Promise<void>;
  abstract getAll(): Promise<ResponseUserDto[]>;
  abstract getCompleteUser(user_id: string): Promise<DomainUser | null>;
  abstract getCompleteUserByEmail(user_email: string): Promise<DomainUser | null>;
  abstract getById(id: string): Promise<ResponseUserDto | null>;
  abstract getByEmail(email: string): Promise<ResponseUserDto | null>;
  abstract update(user: DomainUser): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
