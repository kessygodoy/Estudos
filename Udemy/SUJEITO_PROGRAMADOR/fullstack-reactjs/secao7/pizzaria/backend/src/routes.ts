import { Request, Response, Router } from "express";
import { CreateUserControlller } from "./controllers/user/CreateUserController";
import { createUserSchema } from "./schemas/userSchema";
import { validateSchema } from "./middlewares/validateSchema";

const router = Router();

router.post("/users", validateSchema(createUserSchema), new CreateUserControlller().handle)

export { router }