import { UserSchema, User } from "../entities/User.js"
import { Role } from "../types/Roles.enum.js"


type Override = Partial<UserSchema>

export const makeUser = (override: Override = {}) => {

    const data: UserSchema = {
        name: "John Doe",
        email: "jonhDoe@gmail.com",
        password: "123456",
        role: Role.USER
    }
    return new User({
        ...data
    })
}