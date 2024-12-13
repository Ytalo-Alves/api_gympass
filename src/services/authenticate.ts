import type { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialError } from "./errors/invalid-credential-error";
import { compare } from "bcryptjs";
import type { User } from "@prisma/client";

interface AuthenticateUserCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUserCaseResponse {
  user: User;
}

export class AuthenticateUseCase {
  static execute(arg0: { email: string; password: string; }) {
    throw new Error("Method not implemented.");
  }
  constructor(private usersRepository: UsersRepository) {}
  async execute({
    email,
    password,
  }: AuthenticateUserCaseRequest): Promise<AuthenticateUserCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new InvalidCredentialError();
    }

    const doesPasswordsMatch = await compare(password, user.password_hash);

    if (!doesPasswordsMatch) {
      throw new InvalidCredentialError();
    }

    return {
      user,
    };
  }
}
