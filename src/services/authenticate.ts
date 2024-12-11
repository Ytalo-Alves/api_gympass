import type { UsersRepository } from "@/repositories/users-repository";


interface AuthenticateUserCaseRequest {
  email: string;
  password: string;
}

type AuthenticateUserCaseResponse = void



export class AuthenticateUseCase {

  constructor (
    private usersRepository: UsersRepository,

  ) {}
  async execute({email, password}: AuthenticateUserCaseRequest): Promise<AuthenticateUserCaseResponse> {

  }
}