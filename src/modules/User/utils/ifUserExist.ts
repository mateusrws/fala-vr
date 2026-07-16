import { userRepository } from "../repositories/userRepository";


export function ifUserExist(userRepository: userRepository, email: string): Promise<boolean> {
    return userRepository.getByEmail(email).then(user => !!user);
}