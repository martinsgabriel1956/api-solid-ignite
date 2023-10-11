import { PrismaUsersRepository } from "@/repositories/prisma/PrismaUsersRepository";
import { AuthenticateUseCase } from "@/useCases/auth";

export function makeAuthenticateUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository);

  return authenticateUseCase;
}
