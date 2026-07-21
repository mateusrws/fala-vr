import { userRepository } from "../repositories/userRepository";


export function ifUserExistByEmail(userRepository: userRepository, email: string): Promise<boolean> {
    return userRepository.getByEmail(email).then(user => !!user);
}
export function ifUserExistById(userRepository: userRepository, id: string): Promise<boolean> {
    return userRepository.getById(id).then(user => !!user);
}