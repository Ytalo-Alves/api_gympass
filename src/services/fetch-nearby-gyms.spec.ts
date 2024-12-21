import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { FetchNearbyUseCase } from "./fetch-nearby-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyUseCase;

describe("Search Gym Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyUseCase(gymsRepository);
  });

  // Teste para verificar se a senha do Usuario de fato é um HASH
  it("should be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
      title: "Near Gym",
      description: null,
      phone: null,
      latitude: -23.5056627,
      longitude: -46.8155989,
    });

    await gymsRepository.create({
      title: "Far Gym",
      description: null,
      phone: null,
      latitude: -24.1053074,
      longitude: -47.0524106,
    });

    const { gyms } = await sut.execute({
      userLatitude: -23.5056627,
      userLongitude: -46.8155989,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Near Gym" }),
    ]);
  });

});
