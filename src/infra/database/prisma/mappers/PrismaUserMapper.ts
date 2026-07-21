import { User as UserRaw } from "@prisma/client";
import { User } from "../../../../modules/User/entities/User";

export class PrismaUserMapper{
    static toPrisma(user: any): UserRaw {
        const data = new User({name: user.name, email: user.email, password: user.password, role: user.role})
        return {
            id: data.get_id,
            name: data.get_name,
            email: data.get_email,
            password: data.get_password,
            role: data.get_role
        }
    }
    static toDomain(users: UserRaw[]) {
        return users.map(user => User.reconstitute({
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role
        }, user.id,))
    }
    static toDomainOne(user: UserRaw) {
        return User.reconstitute({
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role
        }, user.id)
    }
}