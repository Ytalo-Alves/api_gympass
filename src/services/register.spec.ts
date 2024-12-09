import { describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

describe("Register services", () => {

  // Teste para verificar se a senha do Usuario de fato é um HASH
it("should has user password upon registration", async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
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
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository);

    const email = 'joe.smith@example.com'

    await registerUseCase.execute({
      name: "Joe Smith",
      email,
      password: "123456",
    });

    await expect(() => 
      registerUseCase.execute({
        name: "Joe Smith",
        email,
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  });

  // Testando o registro de um Usuario.
it("should be able to register", async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository);

    const email = 'joe.smith@example.com'

    const { user } = await registerUseCase.execute({
      name: "Joe Smith",
      email,
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String))
  })
});
