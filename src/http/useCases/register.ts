import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

interface registerUseCaseProps {
  name: string;
  email: string;
  password: string;
}

export async function registerUseCase({
  name,
  email,
  password
}: registerUseCaseProps) {
  const password_hash = await hash(password, 6);

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if(userWithSameEmail) {
    throw new Error("User already exists");
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash
    },
  });
}