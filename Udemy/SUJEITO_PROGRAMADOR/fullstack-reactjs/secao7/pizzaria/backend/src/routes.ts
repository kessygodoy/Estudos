import { Request, Response, Router } from "express";
import { CreateUserControlller } from "./controllers/user/CreateUserController";
import { validateSchema } from "./middlewares/validateSchema";
import { createUserSchema, authUserSchema } from "./schemas/userSchema";
import { AuthUserController } from "./controllers/user/AuthUserController";

const router = Router();

//Rotas users
router.post("/users", validateSchema(createUserSchema), new CreateUserControlller().handle)
router.post("/session", validateSchema(authUserSchema), new AuthUserController().handle)


export { router }