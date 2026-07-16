import { CreateUserUseCase } from "./createUserUseCase";
import { mockUserRepository } from "../../repositories/mockUserRepository";
import { User, UserSchema } from "../../entities/User";
import { Roles } from "../../types/Roles";
import { beforeEach, describe, it } from "node:test";

describe("CreateUserUseCase", () => {
  let repository: mockUserRepository;
  let useCase: CreateUserUseCase;

  beforeEach(() => {
    repository = new mockUserRepository();
    useCase = new CreateUserUseCase(repository);
  });

  it("should create a user when the email is not registered", async () => {
    const user: UserSchema = {
      name: "Mateus",
      email: "mateus@email.com",
      password: "123456",
      role: Roles.USER,
    };

    const result = await useCase.execute(user);

    expect(result).toBeUndefined();
    expect(await repository.getAll()).toHaveLength(1);

    const createdUser = await repository.getByEmail(user.email);
    expect(createdUser).toBeInstanceOf(User);
    expect(createdUser?.get_name).toBe(user.name);
    expect(createdUser?.get_email).toBe(user.email);
  });

  it("should not create a user when the email is already registered", async () => {
    const user: UserSchema = {
      name: "Mateus",
      email: "mateus@email.com",
      password: "123456",
      role: Roles.USER,
    };

    await repository.create(user);

    const result = await useCase.execute(user);

    expect(result).toBeUndefined();
    expect(await repository.getAll()).toHaveLength(1);
  });
});
function expect(result: void) {
    throw new Error("Function not implemented.");
}

