import { UserRepository } from "../repositories/userRepository.js";



export function ifUserExistByEmail(userRepository: UserRepository, email: string): Promise<boolean> {
    return userRepository.getByEmail(email).then(user => !!user);
}
export function ifUserExistById(userRepository: UserRepository, id: string): Promise<boolean> {
    return userRepository.getById(id).then(user => !!user);
}