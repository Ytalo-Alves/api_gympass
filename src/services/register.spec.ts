import { beforeEach, describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";


let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe("Register services", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  // Teste para verificar se a senha do Usuario de fato é um HASH
  it("should has user password upon registration", async () => {
    const { user } = await sut.execute({
      name: "Joe Smith",
      email: "joe.smith@example.com",
      password: "password123",
    });

    const isPasswordCorrectlyHashed = await compare(
      "password123",
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  // Testando se a aplicação irá retornar um erro ao tentar fazer um registro com um email duplicado.
  it("should not be able to register with same email twice", async () => {
    const email = "joe.smith@example.com";

    await sut.execute({
      name: "Joe Smith",
      email,
      password: "123456",
    });

    await expect(() =>
      sut.execute({
        name: "Joe Smith",
        email,
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  // Testando o registro de um Usuario.
  it("should be able to register", async () => {
    const email = "joe.smith@example.com";

    const { user } = await sut.execute({
      name: "Joe Smith",
      email,
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
