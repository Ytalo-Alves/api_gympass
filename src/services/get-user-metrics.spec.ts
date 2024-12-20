import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { FetchUserCheckInsHistoryUseCase } from "./fetch-user-check-ins-history";
import { GetUserMetricsUseCase } from "./get-user-metrics";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: GetUserMetricsUseCase;

describe("Get User Metrics Use Case", () => {
  beforeEach( async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsUseCase(checkInsRepository);

  });

  // Teste para verificar se a senha do Usuario de fato é um HASH
  it("should be able to get check-ins count from metrics", async () => {
    await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: '456'
    })

    await checkInsRepository.create({
      gym_id: 'gym-02',
      user_id: '456'
    })
    
    const { checkInsCount } = await sut.execute({
      userId: "456",
    });

    expect(checkInsCount).toEqual(2)
  });
});
