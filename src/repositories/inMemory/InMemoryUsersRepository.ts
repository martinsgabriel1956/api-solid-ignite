import { Prisma, User } from "@prisma/client";
import { IUsersRepository } from "../IUsersRepository";

export class InMemoryUsersRepository implements IUsersRepository {
  constructor(public users: User[] = []) {}

  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email);

    if(!user) {
      return null;
    }

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      ...data,
      id: "user-1",
      created_at: new Date(),
      updated_at: null,
    };
    
    this.users.push(user);

    return user;
  }
}