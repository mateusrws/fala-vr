import { UserRepository } from '../repositories/userRepository.js';

export async function ifUserExistByEmail(repo: UserRepository, email: string) {
  try {
    await repo.getByEmail(email);
    return true; // achou = existe
  } catch {
    return false; // não achou = não existe
  }
}
export function ifUserExistById(
  userRepository: UserRepository,
  id: string,
): Promise<boolean> {
  return userRepository.getById(id).then((user) => !!user);
}
