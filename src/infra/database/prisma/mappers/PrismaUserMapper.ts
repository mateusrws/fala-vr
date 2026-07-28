
import { User as DomainUser, type UserSchema } from '../../../../modules/User/entities/User.js';
import { Prisma } from '../../../../generated/client.js';

export class PrismaUserMapper {
  static toPrisma(user: DomainUser | UserSchema): Prisma.UserCreateInput {
    const data = user instanceof DomainUser ? user : new DomainUser(user);

    return {
      id: data.get_id,
      name: data.get_name,
      email: data.get_email,
      password: data.get_password,
      img_url: data.get_img_url,
      role: data.get_role,
      createdAt: data.createdAt,
    };
  }

  static toDomain(users: any[]) {
    return users.map((user) =>
      DomainUser.reconstitute(
        {
          name: user.name,
          email: user.email,
          password: user.password,
          role: user.role,
          img_url: user.img_url,
          createdAt: user.createdAt ?? user.created_at ?? new Date(),
        },
        user.id,
      ),
    );
  }

  static toDomainOne(user: any) {
    return DomainUser.reconstitute(
      {
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
        img_url: user.img_url,
        createdAt: user.createdAt ?? user.created_at ?? new Date(),
      },
      user.id,
    );
  }
}
