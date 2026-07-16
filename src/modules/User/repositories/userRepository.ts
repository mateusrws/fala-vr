import { User, UserSchema } from "../entities/User";


export abstract class userRepository{
    abstract create(user: UserSchema): Promise<void>;
    abstract getAll(): Promise<User[]>;
    abstract getById(id: string): Promise<User | null>;
    abstract getByEmail(email: string): Promise<User | null>;
    abstract update(user: User): Promise<void>;
    abstract delete(id: string): Promise<void>;
}