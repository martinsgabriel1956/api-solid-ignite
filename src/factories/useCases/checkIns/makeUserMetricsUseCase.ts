import { PrismaCheckInsRepository } from "@/repositories/prisma/PrismaCheckInsRepository";
import { UserMetricsUseCase } from "@/useCases/checkIn/userMetrics";

export function makeUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new UserMetricsUseCase(checkInsRepository);

  return useCase;
}
