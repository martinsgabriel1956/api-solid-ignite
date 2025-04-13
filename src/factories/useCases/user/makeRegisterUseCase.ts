import { PrismaUsersRepository } from "@/repositories/prisma/PrismaUsersRepository";
import { RegisterUseCase } from "@/useCases/user/register";

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new RegisterUseCase(usersRepository);

  return useCase;
}
