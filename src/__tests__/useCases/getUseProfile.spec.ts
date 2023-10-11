import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "@/errors/useCases/resourceNotFoundError";
import { InMemoryUsersRepository } from "@/repositories/inMemory/InMemoryUsersRepository";
import { GetUserProfileUseCase } from "@/useCases/getUserProfile";

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe("Get User Profile Use Case", async () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it("should be able to get user profile", async () => {
    const createdUser = await usersRepository.create({
      email: "any_email",
      name: "any_name",
      password_hash: await hash("any_password", 6),
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual("any_name");
  });

  it("should not be able to get user profile with wrong id", async () => {
    expect(() =>
      sut.execute({
        userId: "wrong_user_id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
