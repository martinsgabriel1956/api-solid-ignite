import { beforeEach, afterEach, describe, expect, it } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/inMemory/InMemoryCheckInsRepository";
import { ValidateCheckInUseCase } from "@/useCases/checkIn/validate";
import { ResourceNotFoundError } from "@/errors/useCases/resourceNotFoundError";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInUseCase;

describe("Validate Check-Ins Use Case", async () => {
  beforeEach(async() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInUseCase(checkInsRepository);

    // vi.useFakeTimers();
  });
  afterEach(() => {
    // vi.useRealTimers();
  });

  it("should be able to validate the check-in", async () => {
    // vi.setSystemTime(new Date(2022, 1, 11, 8, 0, 0));

    const createdCheckIn = await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(checkInsRepository.checkIns[0].validated_at).toEqual(expect.any(Date));
  });

  it("should not be able to validate an inexistent check-in", async () => {
    await expect(() =>
      sut.execute({
        checkInId: "inexistent-check-in-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
