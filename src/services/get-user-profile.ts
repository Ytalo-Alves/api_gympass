import type { UsersRepository } from "@/repositories/users-repository";
import type { User } from "@prisma/client";
import { ResourceNotFoundErrors } from "./errors/resource-not-found-errors";

interface GetUserCaseProfileUseCaseRequest {
  userId: string
}

interface GetUserCaseProfileUseCaseResponse {
  user: User;
}

export class GetUserProfileUseCase {
  static execute(arg0: { email: string; password: string; }) {
    throw new Error("Method not implemented.");
  }
  constructor(private usersRepository: UsersRepository) {}
  async execute({
    userId

  }: GetUserCaseProfileUseCaseRequest): Promise<GetUserCaseProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    
    if (!user) {
      throw new ResourceNotFoundErrors();
    }

    return {
      user,
    };
  }
}
