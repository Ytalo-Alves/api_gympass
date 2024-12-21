import { beforeEach, describe, expect, it, afterEach, vi } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { ValidateCheckInUseCase } from "./validate-check-in";
import { ResourceNotFoundErrors } from "./errors/resource-not-found-errors";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInUseCase;

describe("Validate Check-in Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInUseCase(checkInsRepository);
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // Teste para verificar se a senha do Usuario de fato é um HASH
  it("should be able to validate the check in", async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: "123",
      user_id: "456",
    });

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date));
  });

  it("should not be able to validate an inexistent check in", async () => {
    await expect(() =>
      sut.execute({
        checkInId: "inexistent-check-in-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundErrors);
  });

  it('should not be able to validate the check-in after 20 minutes fo this creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

    const createdCheckIn = await checkInsRepository.create({
      gym_id: "123",
      user_id: "456",
    });

    const twentyOneMinutesInMs = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyOneMinutesInMs)

    await expect(() => 
      sut.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
});
