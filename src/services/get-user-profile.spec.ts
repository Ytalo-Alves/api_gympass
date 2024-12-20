import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialError } from "./errors/invalid-credential-error";
import { GetUserProfileUseCase } from "./get-user-profile";
import { ResourceNotFoundErrors } from "./errors/resource-not-found-errors";

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });
  // Teste para verificar se a senha do Usuario de fato é um HASH
  it("should be able to get user profile", async () => {
   const createdUser = await usersRepository.create({
      name: "Joe Smith",
      email: "joe.smith@example.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.name).toEqual('Joe Smith');
  });

  it("should not be able to get user profile with wrong id", async () => {
    await expect(() =>
      sut.execute({
        userId: 'no-existing-id'
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundErrors);
  });

});
