import { UserAlreadyExistsError } from "@/errors/UserAlreadyExistsError";
import { InMemoryUsersRepository } from "@/repositories/inMemory/InMemoryUsersRepository";
import { RegisterUseCase } from "@/useCases/register";
import { compare } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe("Register Use Case", async () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it("should be able to register", async () => {
    const { user } = await sut.execute({
      name: "any_name",
      email: "any_email",
      password: "any_password",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const { user } = await sut.execute({
      name: "any_name",
      email: "any_email",
      password: "any_password",
    });

    const isPasswordCorrectlyHashed = await compare(
      "any_password",
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register user with same email twice", async () => {
    await sut.execute({
      name: "any_name",
      email: "any_email",
      password: "any_password",
    });

    expect(() =>
      sut.execute({
        name: "any_name",
        email: "any_email",
        password: "any_password",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
