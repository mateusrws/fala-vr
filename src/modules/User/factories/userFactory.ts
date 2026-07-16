import { UserSchema } from "../entities/User";
import { User } from "../entities/User"
import { Roles } from "../types/Roles";

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