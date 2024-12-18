import { beforeEach, describe, expect, it, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./check-in";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe("Check-in Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // Teste para verificar se a senha do Usuario de fato é um HASH
  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "123",
      userId: "456",
    });


    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in the some day", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "123",
      userId: "456",
    });

    await expect(() =>
      sut.execute({
        gymId: "123",
        userId: "456",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
