import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/inMemory/InMemoryCheckInsRepository";
import { CheckInUseCase } from "@/useCases/checkIn";

let checkInRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe("Check-Ins Use Case", async () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkInRepository);
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
