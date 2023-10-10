import { FastifyInstance } from "fastify";
import { register as registerController } from "../controllers/register";
import { auth as authController } from "../controllers/auth";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", registerController);
  app.post("/sessions", authController);
}
