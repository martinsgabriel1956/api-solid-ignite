import { PrismaGymsRepository } from "@/repositories/prisma/PrismaGymsRepository";
import { CreateGymUseCase } from "@/useCases/gym/createGym";

export function makeGymUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new CreateGymUseCase(gymsRepository);

  return useCase;
}
