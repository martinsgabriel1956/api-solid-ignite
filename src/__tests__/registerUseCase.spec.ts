import { UserAlreadyExistsError } from "@/errors/UserAlreadyExistsError";
import { InMemoryUsersRepository } from "@/repositories/inMemory/InMemoryUsersRepository";
import { RegisterUseCase } from "@/useCases/register";
import { compare } from "bcryptjs";
import { describe, expect, it } from "vitest";

describe("Register Use Case", async () => {
  it("should be able to register", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(inMemoryUsersRepository);

    const { user } = await registerUseCase.execute({
      name: "any_name",
      email: "any_email",
      password: "any_password",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(inMemoryUsersRepository);

    const { user } = await registerUseCase.execute({
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
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(inMemoryUsersRepository);

    await registerUseCase.execute({
      name: "any_name",
      email: "any_email",
      password: "any_password",
    });

    expect(() =>
      registerUseCase.execute({
        name: "any_name",
        email: "any_email",
        password: "any_password",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});