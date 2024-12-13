import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialError } from "./errors/invalid-credential-error";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe("authenticate services", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });
  // Teste para verificar se a senha do Usuario de fato é um HASH
  it("should be able to authenticate", async () => {
    await usersRepository.create({
      name: "Joe Smith",
      email: "joe.smith@example.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "joe.smith@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    expect(() =>
      sut.execute({
        email: "joe.smith@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await usersRepository.create({
      name: "Joe Smith",
      email: "joe.smith@example.com",
      password_hash: await hash("123456", 6),
    });

    expect(() =>
      sut.execute({
        email: "joe.smith@example.com",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialError);
  });
});
