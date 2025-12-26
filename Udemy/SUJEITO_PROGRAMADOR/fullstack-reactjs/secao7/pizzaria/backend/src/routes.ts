import { Request, Response, Router } from "express";
import { CreateUserControlller } from "./controllers/user/CreateUserController";

const router = Router();

router.post("/users", new CreateUserControlller().handle)

export { router }