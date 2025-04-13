import { PrismaCheckInsRepository } from "@/repositories/prisma/PrismaCheckInsRepository";
import { ValidateCheckInUseCase } from "@/useCases/checkIn/validate";

export function makeUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new ValidateCheckInUseCase(checkInsRepository);

  return useCase;
}
