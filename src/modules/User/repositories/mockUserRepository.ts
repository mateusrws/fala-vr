import { ResponseUserDto } from "src/infra/http/modules/user/dto/ResponseUserDto";
import { User, UserSchema } from "../entities/User";
import { userRepository } from "./userRepository";

export class mockUserRepository implements userRepository {
    public users: User[] = []

    async create(userRaw: UserSchema): Promise<void> {
        const user = new User(userRaw)
        this.users.push(user)
    }
    async getAll(): Promise<ResponseUserDto[]> {
        return this.users.map(user => ({
            id: user.get_id,
            name: user.get_name,
            email: user.get_email,
            role: user.get_role
        }))
    }
    async getById(id: string): Promise<ResponseUserDto | null> {
        const user = this.users.find(u => u.get_id === id)
        return user ? {
            id: user.get_id,
            name: user.get_name,
            email: user.get_email,
            role: user.get_role
        } : null
    }
    async getByEmail(email: string): Promise<ResponseUserDto | null> {
        const user = this.users.find(u => u.get_email === email)
        if (!user) throw new Error("User not found")
        return {
            id: user.get_id,
            name: user.get_name,
            email: user.get_email,
            role: user.get_role
        }
    }
    async update(user: User): Promise<void> {
        const index = this.users.findIndex(u => u.get_id === user.get_id)
        if (index !== -1) {
            this.users[index] = user
        }
    }
    async delete(id: string): Promise<void> {
        if (!id) throw new Error("User ID is required for delete")
        this.users = this.users.filter(user => user.get_id !== id)
    }
}