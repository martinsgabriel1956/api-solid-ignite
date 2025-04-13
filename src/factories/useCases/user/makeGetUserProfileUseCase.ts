import { PrismaUsersRepository } from "@/repositories/prisma/PrismaUsersRepository";
import { GetUserProfileUseCase } from "@/useCases/user/profile";

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new GetUserProfileUseCase(usersRepository);

  return useCase;
}
