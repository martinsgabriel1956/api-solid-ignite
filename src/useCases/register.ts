import { User } from "@prisma/client";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "@/errors/UserAlreadyExistsError";
import { IUsersRepository } from "@/repositories/IUsersRepository";

interface RegisterUseCaseProps {
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    name,
    email,
    password
  }: RegisterUseCaseProps): Promise<RegisterUseCaseResponse> {

    const password_hash = await hash(password, 6);
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if(userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      email,
      name,
      password_hash
    });

    return {
      user
    };
  }
}