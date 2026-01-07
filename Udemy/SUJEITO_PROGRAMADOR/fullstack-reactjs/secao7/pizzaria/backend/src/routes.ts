import { Request, Response, Router } from "express";
import { CreateUserControlller } from "./controllers/user/CreateUserController";
import { validateSchema } from "./middlewares/validateSchema";
import { createUserSchema, authUserSchema } from "./schemas/userSchema";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { isAdmin } from "./middlewares/isAdmin";
import { CreateCategoryController } from "./controllers/category/CreateCategorytController";
import { createCategorySchema } from "./schemas/categorySchema";

const router = Router();

//Rotas users
router.post("/users", validateSchema(createUserSchema), new CreateUserControlller().handle)
router.post("/session", validateSchema(authUserSchema), new AuthUserController().handle)
router.get("/me", isAuthenticated, new DetailUserController().handle)

//Rotas categories
router.post("/category", isAuthenticated, isAdmin, validateSchema(createCategorySchema), new CreateCategoryController().handle)

export { router }