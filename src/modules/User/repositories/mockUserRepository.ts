import { User, UserSchema } from "../entities/User";
import { userRepository } from "./userRepository";

export class mockUserRepository implements userRepository {
    public users: User[] = []

    async create(userRaw: UserSchema): Promise<void> {
        const user = new User(userRaw)
        this.users.push(user)
    }
    async getAll(): Promise<User[]> {
        return this.users
    }
    async getById(id: string): Promise<User | null> {
        const user = this.users.find(u => u.get_id === id)
        return user || null
    }
    async getByEmail(email: string): Promise<User | null> {
        const user = this.users.find(u => u.get_email === email)
        return user || null
    }
    async update(user: User): Promise<void> {
        const index = this.users.findIndex(u => u.get_id === user.get_id)
        if (index !== -1) {
            this.users[index] = user
        }
    }
    async delete(id: string): Promise<void> {
        this.users = this.users.filter(user => user.get_id !== id)
    }
}