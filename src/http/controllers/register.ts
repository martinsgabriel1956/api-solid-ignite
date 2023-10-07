import { FastifyRequest, FastifyReply } from "fastify";
import { z as zod } from "zod";
import { RegisterUseCase } from "../useCases/register";
import { PrismaUsersRepository } from "@/repositories/prisma/PrismaUsersRepository";

export async function register (request: FastifyRequest, response: FastifyReply)  {
  const registerBodySchema = zod.object({
    name: zod.string(),
    email: zod.string(),
    password: zod.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  const prismaUsersRepository = new PrismaUsersRepository();
  const registerUseCase = new RegisterUseCase(prismaUsersRepository);

  try {
    await registerUseCase.execute({
      name,
      email,
      password
    });
  } catch (error) {
    return response.status(409).send();
  }

  return response.status(201).send();
}