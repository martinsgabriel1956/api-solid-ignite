import { InvalidCredentialsError } from "@/errors/invalidCredentialsError";
import { InMemoryUsersRepository } from "@/repositories/inMemory/InMemoryUsersRepository";
import { AuthenticateUseCase } from "@/useCases/auth";
import { hash } from "bcryptjs";
import { describe, expect, it } from "vitest";

describe("Authenticate Use Case", async () => {
  it("should be able to authenticate", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({
      email: "any_email",
      name: "any_name",
      password_hash: await hash("any_password", 6),
    });

    const { user } = await sut.execute({
      email: "any_email",
      password: "any_password",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    expect(() =>
      sut.execute({
        email: "any_email",
        password: "any_password",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong email", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({
      email: "any_email",
      name: "any_name",
      password_hash: await hash("any_password", 6),
    });

    expect(() =>
      sut.execute({
        email: "any_email",
        password: "any_password12",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
