import { User as Raw } from "@prisma/client"
import { ResponseUserDto } from "../../../infra/http/modules/user/dto/ResponseUserDto.js"
import { UserSchema, User } from "../entities/User.js"
import { UserRepository } from "./userRepository.js"


export class mockUserRepository implements UserRepository {
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