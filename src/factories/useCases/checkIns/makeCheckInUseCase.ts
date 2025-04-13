import { PrismaCheckInsRepository } from "@/repositories/prisma/PrismaCheckInsRepository";
import { PrismaGymsRepository } from "@/repositories/prisma/PrismaGymsRepository";
import { CheckInUseCase } from "@/useCases/checkIn/checkin";

export function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new CheckInUseCase(checkInsRepository, gymsRepository);

  return useCase;
}
