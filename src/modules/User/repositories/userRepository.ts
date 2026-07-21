import { User } from "@prisma/client";
import { ResponseUserDto } from "../../../infra/http/modules/user/dto/ResponseUserDto.js";
import { UserSchema } from "../entities/User.js";



export abstract class UserRepository{
    abstract create(user: UserSchema): Promise<void>;
    abstract getAll(): Promise<ResponseUserDto[]>;
    abstract getById(id: string): Promise<ResponseUserDto | null>;
    abstract getByEmail(email: string): Promise<ResponseUserDto | null>;
    abstract update(user: User): Promise<void>;
    abstract delete(id: string): Promise<void>;
}