import { FastifyRequest, FastifyReply } from "fastify";
import { z as zod } from "zod";
import { UserAlreadyExistsError } from "@/errors/useCases/UserAlreadyExistsError";
import { makeRegisterUseCase } from "@/factories/useCases/makeRegisterUseCase";

export async function register(
  request: FastifyRequest,
  response: FastifyReply
) {
  const registerBodySchema = zod.object({
    name: zod.string(),
    email: zod.string(),
    password: zod.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  const registerUseCase = makeRegisterUseCase();

  try {
    await registerUseCase.execute({
      name,
      email,
      password,
    });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return response.status(409).send({
        message: error.message,
      });
    }

    return response.status(500).send();
  }

  return response.status(201).send();
}
