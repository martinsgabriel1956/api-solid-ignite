import "dotenv/config";
import { z as zod } from "zod";

const envSchema = zod.object({
  NODE_ENV: zod
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: zod.coerce.number().default(3333),
});

export const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error(`${_env.error.format()}\n`);
  throw new Error(`❌ Invalid environment variables`);
}

export const env = _env.data;
