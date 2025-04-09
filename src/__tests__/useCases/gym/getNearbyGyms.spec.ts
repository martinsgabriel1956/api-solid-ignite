import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/inMemory/inMemoryGymsRepository";
import { GetNearbyGymsUseCase } from "@/useCases/gym/getNearbyGyms";

let gymsRepository: InMemoryGymsRepository;
let sut: GetNearbyGymsUseCase;

describe("Get Nearby Gyms Use Case", async () => {
  beforeEach(async() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new GetNearbyGymsUseCase(gymsRepository);
  });


  it("should be able to get nearby gyms", async () => {
    await gymsRepository.create({
      title: "Near Gym",
      description: null,
      phone: null,
      latitude: -22.922772,
      longitude: -43.5510806,
    });
    
    await gymsRepository.create({
      title: "Far Gym",
      description: null,
      phone: null,
      latitude: -22.370865,
      longitude: -42.974716,
    });
    
    const { gyms } = await sut.execute({
      userLatitude: -22.922772,
      userLongitude: -43.5510806,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Near Gym" }),
    ]);
  });
});
