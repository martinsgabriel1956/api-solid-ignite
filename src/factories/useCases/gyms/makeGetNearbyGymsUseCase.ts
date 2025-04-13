import { PrismaGymsRepository } from "@/repositories/prisma/PrismaGymsRepository";
import { GetNearbyGymsUseCase } from "@/useCases/gym/getNearbyGyms";

export function makeGetNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new GetNearbyGymsUseCase(gymsRepository);

  return useCase;
}
