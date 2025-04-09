import { InMemoryGymsRepository } from "@/repositories/inMemory/inMemoryGymsRepository";
import { GymUseCase } from "@/useCases/gym";
// import { RegisterUseCase } from "@/useCases/register";
import { beforeEach, describe, expect, it } from "vitest";

let gymsRepository: InMemoryGymsRepository;
let sut: GymUseCase;

describe("Create Gym Use Case", async () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new GymUseCase(gymsRepository);
  });

  it("should be able to create gym", async () => {
    const { gym } = await sut.execute({
      title: "JavaScript Gym",
      description: null,
      phone: null,
      latitude: -22.922772,
      longitude: -43.5510806,
    });

    expect(gym.id).toEqual(expect.any(String));
  });

});
