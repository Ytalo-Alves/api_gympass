import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymsUseCase } from "./search-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe("Search Gym Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });

  // Teste para verificar se a senha do Usuario de fato é um HASH
  it("should be able to search for gyms", async () => {
    await gymsRepository.create({
      title: "Javascript Gym",
      description: null,
      phone: null,
      latitude: -23.5056627,
      longitude: -46.8155989,
    });

    await gymsRepository.create({
      title: "TypeScript Gym",
      description: null,
      phone: null,
      latitude: -23.5056627,
      longitude: -46.8155989,
    });

    const { gyms } = await sut.execute({
      query: "Javascript",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Javascript Gym" }),
    ]);
  });

  it("should be able to fetch paginated gym search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JavaScript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -23.5056627,
        longitude: -46.8155989,
      });
    }

    const { gyms } = await sut.execute({
      query: "JavaScript",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "JavaScript Gym 21" }),
      expect.objectContaining({ title: "JavaScript Gym 22" }),
    ]);
  });
});
