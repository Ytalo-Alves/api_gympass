import { beforeEach, describe, expect, it, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./check-in";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error";
import { MaxDistanceError } from "./errors/max-distance-error";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;
let gymsRepository: InMemoryGymsRepository;

describe("Check-in Use Case", () => {
  beforeEach( async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    await gymsRepository.create({
      id: "123",
      title: "Gym 1",
      description: "",
      phone: "",
      latitude: -23.5056627,
      longitude: -46.8155989,
    })

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
      userLatitude: -23.5056627,
      userLongitude: -46.8155989,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in the some day", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "123",
      userId: "456",
      userLatitude: -23.5056627,
      userLongitude: -46.8155989,
    });

    await expect(() =>
      sut.execute({
        gymId: "123",
        userId: "456",
        userLatitude: -23.5056627,
        userLongitude: -46.8155989,
      })
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  it("Should be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "123",
      userId: "456",
      userLatitude: -23.5056627,
      userLongitude: -46.8155989,
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "123",
      userId: "456",
      userLatitude: -23.5056627,
      userLongitude: -46.8155989,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in on distant gym", async () => {

    gymsRepository.items.push({
      id: "123",
      title: "Gym 1",
      description: "",
      phone: "",
      latitude: new Decimal(-23.5121597),
      longitude: new Decimal(-46.8098707),
    });
    
    await expect(() => 
      sut.execute({
        gymId: "123",
        userId: "456",
        userLatitude: -23.5121597,
        userLongitude: -46.8098707,
      })
    ).rejects.toBeInstanceOf(MaxDistanceError)
  });
  
  
});
