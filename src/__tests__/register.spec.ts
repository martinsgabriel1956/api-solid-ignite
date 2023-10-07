import { RegisterUseCase } from "@/http/useCases/register";
import { compare } from "bcryptjs";
import { describe, expect, it } from "vitest";

describe("Register Use Case", async () => {
  it("should hash user password upon registration", async () => {
    const registerUseCase = new RegisterUseCase({
      async findByEmail(email) {
        return null;
      },

      async create({ name, email, password_hash }) {
        return {
          id: "user-1",
          name,
          email,
          password_hash,
          created_at: new Date(),
          updated_at: null,
        };
      },
    });

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
});