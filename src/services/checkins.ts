import type { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialError } from "./errors/invalid-credential-error";
import { compare } from "bcryptjs";
import type { CheckIn } from "@prisma/client";
import type { CheckInsRepository } from "@/repositories/check-ins-repository";

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  static execute(arg0: { email: string; password: string; }) {
    throw new Error("Method not implemented.");
  }
  constructor(private checkInsRepository: CheckInsRepository){}
  async execute({
    userId,
    gymId
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId
    })
    
    return {
      checkIn,
    };
  }
}
