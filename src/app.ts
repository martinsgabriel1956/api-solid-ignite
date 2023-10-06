import fastify from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

prisma.user.create({
  data: {
    name : "John Doe",
    email: "uUk9b@example.com",
  }
});

export const app = fastify();
