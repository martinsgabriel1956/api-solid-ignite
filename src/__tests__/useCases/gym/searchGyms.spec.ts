import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/inMemory/inMemoryGymsRepository";
import { SearchGymsUseCase } from "@/useCases/gym/searchGyms";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe("Search Gyms Use Case", async () => {
  beforeEach(async() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });


  it("should be able to search for gyms", async () => {
    await gymsRepository.create({
      title: "JavaScript Gym",
      description: null,
      phone: null,
      latitude: -22.922772,
      longitude: -43.5510806,
    });
    
    await gymsRepository.create({
      title: "TypeScript Gym",
      description: null,
      phone: null,
      latitude: -22.922772,
      longitude: -43.5510806,
    });
    
    const { gyms } = await sut.execute({
      query: "TypeScript",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "TypeScript Gym" }),
    ]);
  });
 
  it("should be able to get paginated gyms search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `TypeScript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -22.922772,
        longitude: -43.5510806,
      });
    }

    const { gyms } = await sut.execute({
      query: "TypeScript",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "TypeScript Gym 21" }),
      expect.objectContaining({ title: "TypeScript Gym 22" }),
    ]);
  });
});
