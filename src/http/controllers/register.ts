import { FastifyRequest, FastifyReply } from "fastify";
import { z as zod } from "zod";
import { prisma } from "@/lib/prisma";

export async function register (request: FastifyRequest, response: FastifyReply)  {
  const registerBodySchema = zod.object({
    name: zod.string(),
    email: zod.string(),
    password: zod.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: password,
    },
  });

  return response.status(201).send();
}