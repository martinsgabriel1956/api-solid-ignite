import { InvalidCredentialsError } from "@/errors/useCases/invalidCredentialsError";
import { InMemoryUsersRepository } from "@/repositories/inMemory/InMemoryUsersRepository";
import { AuthenticateUseCase } from "@/useCases/auth";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", async () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it("should be able to authenticate", async () => {
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
    await expect(() =>
      sut.execute({
        email: "any_email",
        password: "any_password",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong email", async () => {
    await usersRepository.create({
      email: "any_email",
      name: "any_name",
      password_hash: await hash("any_password", 6),
    });

    await expect(() =>
      sut.execute({
        email: "any_email",
        password: "any_password12",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
