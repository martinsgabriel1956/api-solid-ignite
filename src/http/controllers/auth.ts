import { FastifyRequest, FastifyReply } from "fastify";
import { z as zod } from "zod";
import { InvalidCredentialsError } from "@/errors/useCases/invalidCredentialsError";
import { makeAuthenticateUseCase } from "@/factories/useCases/makeAuthUseCase";

export async function auth(request: FastifyRequest, response: FastifyReply) {
  const authenticateBodySchema = zod.object({
    email: zod.string(),
    password: zod.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  const authenticateUseCase = makeAuthenticateUseCase();

  try {
    await authenticateUseCase.execute({
      email,
      password,
    });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return response.status(400).send({
        message: error.message,
      });
    }

    return response.status(500).send();
  }

  return response.status(200).send();
}
