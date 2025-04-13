import { PrismaCheckInsRepository } from "@/repositories/prisma/PrismaCheckInsRepository";
import { UserCheckInsHistoryUseCase } from "@/useCases/checkIn/userCheckInsHistory";

export function makeUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new UserCheckInsHistoryUseCase(checkInsRepository);

  return useCase;
}
