import type { User, Prisma, CheckIn } from "@prisma/client";
import type { UsersRepository } from "../users-repository";
import type { CheckInsRepository } from "../check-ins-repository";
import { randomUUID } from "node:crypto";

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = [];


  async findByUserIdOnDate(userId: string, date: Date){
    const checkInOnSomeDate = this.items.find(
      (checkIn) => checkIn.user_id === userId
    )

    if(!checkInOnSomeDate){
      return null;
    }

    return checkInOnSomeDate
  }


  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    };

    this.items.push(checkIn);
    return checkIn;
  }
}
