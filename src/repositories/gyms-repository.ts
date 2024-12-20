import type { Gym, Prisma } from "@prisma/client";

export interface GymRepository {
  findById(id: string): Promise<Gym | null>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}