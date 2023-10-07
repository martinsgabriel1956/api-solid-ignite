import { UserAlreadyExistsError } from "@/errors/UserAlreadyExistsError";
import { IUsersRepository } from "@/repositories/IUsersRepository";
import { hash } from "bcryptjs";

interface registerUseCaseProps {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    name,
    email,
    password
  }: registerUseCaseProps) {

    const password_hash = await hash(password, 6);
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if(userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    await this.usersRepository.create({
      email,
      name,
      password_hash
    });
  }
}