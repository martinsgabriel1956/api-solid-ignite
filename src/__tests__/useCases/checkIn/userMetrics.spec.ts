import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/inMemory/InMemoryCheckInsRepository";
import { UserMetricsUseCase } from "@/useCases/checkIn/userMetrics";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: UserMetricsUseCase;

describe("Get User Metrics Use Case", async () => {
  beforeEach(async() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new UserMetricsUseCase(checkInsRepository);
  });

  it("should be able to get check-ins count from metrics", async () => {
    await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });
    
    await checkInsRepository.create({
      gym_id: "gym-02",
      user_id: "user-01",
    });
    
    const { checkInsCount } = await sut.execute({
      userId: "user-01",
    });

    expect(checkInsCount).toEqual(2);
  });
});
