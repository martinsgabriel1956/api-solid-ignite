import { FastifyInstance } from "fastify";
import { register as registerController } from "../controllers/register";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", registerController);
}