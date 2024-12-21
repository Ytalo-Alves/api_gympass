import type { Gym } from "@prisma/client";
import type { GymRepository } from "@/repositories/gyms-repository";

interface FetchNearbyUseCaseRequest {
  userLatitude: number;
  userLongitude: number;
}

interface FetchNearbyUseCaseResponse {
  gyms: Gym[];
}

export class FetchNearbyUseCase {
  constructor(private gymsRepository: GymRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyUseCaseRequest): Promise<FetchNearbyUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return {
      gyms,
    };
  }
}
