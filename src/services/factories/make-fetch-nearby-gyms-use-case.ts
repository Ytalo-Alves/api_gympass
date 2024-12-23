import { FetchNearbyUseCase } from "../fetch-nearby-gyms";
import { SearchGymsUseCase } from "../search-gyms";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export default function MakeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new FetchNearbyUseCase(gymsRepository);

  return useCase;
}
