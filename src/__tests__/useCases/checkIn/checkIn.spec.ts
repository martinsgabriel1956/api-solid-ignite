import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/inMemory/InMemoryCheckInsRepository";
import { CheckInUseCase } from "@/useCases/checkIn/checkin";
import { InMemoryGymsRepository } from "@/repositories/inMemory/inMemoryGymsRepository";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxDistanceError } from "@/errors/useCases/maxDistanceError";
import { MaxNumberOfCheckInsError } from "@/errors/useCases/maxNumberOfCheckInsError";

let checkInRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe("Check-Ins Use Case", async () => {
  beforeEach(async() => {
    checkInRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInRepository, gymsRepository);

    await gymsRepository.create({
      id: "gym-01",
      title: "JavaScript Gym",
      description: "",
      phone: "",
      latitude: -22.922772,
      longitude: -43.5510806,
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    vi.setSystemTime(new Date(2022, 1, 11, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -22.922772,
      userLongitude: -43.5510806,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2022, 4, 19, 19, 56, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -22.922772,
      userLongitude: -43.5510806,
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: -22.922772,
        userLongitude: -43.5510806,
      })
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  it("should not be able to check in twice but in the different days", async () => {
    vi.setSystemTime(new Date(2022, 4, 19, 19, 56, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -22.922772,
      userLongitude: -43.5510806,
    });

    vi.setSystemTime(new Date(2022, 4, 20, 19, 56, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -22.922772,
      userLongitude: -43.5510806,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should be able to check in on distant gym", async () => {
    vi.setSystemTime(new Date(2022, 1, 11, 8, 0, 0));

    gymsRepository.gyms.push({
      id: "gym-02",
      title: "JavaScript Gym",
      description: "",
      phone: "",
      latitude: new Decimal(-22.919551),
      longitude: new Decimal(-43.538785),
    });

    await expect(() => sut.execute({
      gymId: "gym-02",
      userId: "user-01",
      userLatitude: -22.922772,
      userLongitude: -43.5510806,
    })).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
