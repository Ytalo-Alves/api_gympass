import type { CheckIn } from "@prisma/client";
import type { CheckInsRepository } from "@/repositories/check-ins-repository";
import { ResourceNotFoundErrors } from "./errors/resource-not-found-errors";
import dayjs from "dayjs";
import { LateCheckInValidationError } from "./errors/late-check-in-validation-error";

interface ValidateCheckInUseCaseRequest {
  checkInId: string;
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  static execute(arg0: { email: string; password: string }) {
    throw new Error("Method not implemented.");
  }
  constructor(
    private checkInsRepository: CheckInsRepository) {}
  async execute({
    checkInId
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {

    const checkIn = await this.checkInsRepository.findById(checkInId);

    if(!checkIn) {
      throw new ResourceNotFoundErrors()
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minute'
    )

    if(distanceInMinutesFromCheckInCreation > 20){
      throw new LateCheckInValidationError()
    }

    checkIn.validated_at = new Date()

    await this.checkInsRepository.save(checkIn)

    return {
      checkIn,
    };
  }
}
