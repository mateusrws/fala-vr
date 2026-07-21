import { UserSchema, User } from "../entities/User.js"
import { Roles } from "../types/Roles.js"


type Override = Partial<UserSchema>

export const makeUser = (override: Override = {}) => {

    const data: UserSchema = {
        name: "John Doe",
        email: "jonhDoe@gmail.com",
        password: "123456",
        role: Roles.USER
    }
    return new User({
        ...data
    })
}