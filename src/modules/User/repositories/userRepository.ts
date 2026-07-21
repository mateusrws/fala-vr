import { ResponseUserDto } from "src/infra/http/modules/user/dto/ResponseUserDto";
import { User, UserSchema } from "../entities/User";


export abstract class userRepository{
    abstract create(user: UserSchema): Promise<void>;
    abstract getAll(): Promise<ResponseUserDto[]>;
    abstract getById(id: string): Promise<ResponseUserDto | null>;
    abstract getByEmail(email: string): Promise<ResponseUserDto | null>;
    abstract update(user: User): Promise<void>;
    abstract delete(id: string): Promise<void>;
}