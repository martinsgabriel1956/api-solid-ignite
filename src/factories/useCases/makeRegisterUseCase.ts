import { PrismaUsersRepository } from "@/repositories/prisma/PrismaUsersRepository";
import { RegisterUseCase } from "@/useCases/register";

export function makeRegisterUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const registerUseCase = new RegisterUseCase(prismaUsersRepository);

  return registerUseCase;
}
