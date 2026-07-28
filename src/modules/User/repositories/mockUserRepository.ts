import { ResponseUserDto } from '../../../infra/http/modules/user/dto/ResponseUserDto.js';
import { UserSchema, User } from '../entities/User.js';
import { UserRepository } from './userRepository.js';

export class mockUserRepository implements UserRepository {
  getCompleteUserByEmail(user_email: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  public users: User[] = [];

  async getCompleteUser(user_id: string): Promise<User | null> {
    const user = this.users.find((u) => u.get_id === user_id);
    if (!user) return null;
    return user;
  }

  async create(userRaw: User): Promise<void> {
    this.users.push(userRaw);
  }
  async getAll(): Promise<ResponseUserDto[]> {
    return this.users.map((user) => ({
      id: user.get_id,
      name: user.get_name,
      email: user.get_email,
      role: user.get_role,
      img_url: user.get_img_url,
    }));
  }
  async getById(id: string): Promise<ResponseUserDto | null> {
    const user = this.users.find((u) => u.get_id === id);
    return user
      ? {
          id: user.get_id,
          name: user.get_name,
          email: user.get_email,
          role: user.get_role,
          img_url: user.get_img_url,
          password: user.get_password,
        }
      : null;
  }
  async getByEmail(email: string): Promise<ResponseUserDto | null> {
    const user = this.users.find((u) => u.get_email === email);
    if (!user) throw new Error('User not found');
    return {
      id: user.get_id,
      name: user.get_name,
      email: user.get_email,
      role: user.get_role,
      img_url: user.get_img_url,
      password: user.get_password,
    };
  }
  async update(user: User): Promise<void> {
    const index = this.users.findIndex((u) => u.get_id === user.get_id);
    if (index !== -1) {
      this.users[index] = user;
    }
  }
  async delete(id: string): Promise<void> {
    if (!id) throw new Error('User ID is required for delete');
    this.users = this.users.filter((user) => user.get_id !== id);
  }
}
