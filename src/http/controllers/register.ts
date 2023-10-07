import { FastifyRequest, FastifyReply } from "fastify";
import { z as zod } from "zod";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function register (request: FastifyRequest, response: FastifyReply)  {
  const registerBodySchema = zod.object({
    name: zod.string(),
    email: zod.string(),
    password: zod.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  const password_hash = await hash(password, 6);

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if(userWithSameEmail) {
    return response.status(409).send({
      message: "User already exists",
    });
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash
    },
  });

  return response.status(201).send();
}