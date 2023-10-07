import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

interface registerUseCaseProps {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private usersRepository: any) {}

  async execute({
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

    await this.usersRepository.create({
      name,
      email,
      password_hash
    });
  }
}

// export async function registerUseCase({
//   name,
//   email,
//   password
// }: registerUseCaseProps) {
//   const password_hash = await hash(password, 6);

//   const userWithSameEmail = await prisma.user.findUnique({
//     where: {
//       email,
//     },
//   });

//   if(userWithSameEmail) {
//     throw new Error("User already exists");
//   }

//   const prismaUsersRepository = new PrismaUsersRepository();

//   await prismaUsersRepository.create({
//     name,
//     email,
//     password_hash
//   });
// }