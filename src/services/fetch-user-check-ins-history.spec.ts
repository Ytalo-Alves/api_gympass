import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { FetchUserCheckInsHistoryUseCase } from "./fetch-user-check-ins-history";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: FetchUserCheckInsHistoryUseCase;

describe("Fetch User Check-in history Use Case", () => {
  beforeEach( async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository);

  });

  // Teste para verificar se a senha do Usuario de fato é um HASH
  it("should be able to fetch check-in history", async () => {
    await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: '456'
    })

    await checkInsRepository.create({
      gym_id: 'gym-02',
      user_id: '456'
    })
    
    const { checkIns } = await sut.execute({
      userId: "456",
      page: 1
    });

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({gym_id: 'gym-01'}),
      expect.objectContaining({gym_id: 'gym-02'})
    ])
  });


  it("should be able to fetch paginated check-in history", async () => {
    
    for (let i = 1; i <= 22; i++){
      await checkInsRepository.create({
        gym_id: `gym-${i}`,
        user_id: '456'
      })
    }
    
    const { checkIns } = await sut.execute({
      userId: "456",
      page: 2
    });

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({gym_id: 'gym-21'}),
      expect.objectContaining({gym_id: 'gym-22'})
    ])
  });
  
});
