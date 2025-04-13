import { PrismaGymsRepository } from "@/repositories/prisma/PrismaGymsRepository";
import { SearchGymsUseCase } from "@/useCases/gym/searchGyms";

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new SearchGymsUseCase(gymsRepository);

  return useCase;
}
