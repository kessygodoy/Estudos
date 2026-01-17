import { Router } from "express";
import multer from "multer";
import uploadConfig from "./config/multer";
import { CreateUserControlller } from "./controllers/user/CreateUserController";
import { validateSchema } from "./middlewares/validateSchema";
import { createUserSchema, authUserSchema } from "./schemas/userSchema";
import { createProductSchema } from "./schemas/productSchema";
import { createCategorySchema } from "./schemas/categorySchema";
import { addItemSchema, createOrderSchema, finishOrderSchema, sendOrderSchema } from "./schemas/orderSchema";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { isAdmin } from "./middlewares/isAdmin";
import { CreateCategoryController } from "./controllers/category/CreateCategorytController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListProductController } from "./controllers/product/ListProductController";
import { DeleteProductController } from "./controllers/product/DeleteProductController";
import { ListProductByCategoryController } from "./controllers/product/ListProductByCategoryController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { ListOrdersController } from "./controllers/order/ListOrdersController";
import { AddItemController } from "./controllers/order/AddItemController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";

const router = Router();
const upload = multer(uploadConfig);

//Rotas users
router.post("/users", validateSchema(createUserSchema),
    new CreateUserControlller().handle)
router.post("/session", validateSchema(authUserSchema),
    new AuthUserController().handle)
router.get("/me", isAuthenticated, new DetailUserController().handle)

//Rotas categories
router.post("/category", isAuthenticated, isAdmin, validateSchema(createCategorySchema),
    new CreateCategoryController().handle)
router.get("/category", isAuthenticated,
    new ListCategoryController().handle)

//Rotas products
router.post("/product", isAuthenticated, isAdmin,
    upload.single("file"), validateSchema(createProductSchema),
    new CreateProductController().handle)
router.get("/products", isAuthenticated,
    new ListProductController().handle)
router.delete("/product", isAuthenticated, isAdmin,
    new DeleteProductController().handle)
router.get("/category/product", isAuthenticated,
    new ListProductByCategoryController().handle)

//Rotas orders
router.post("/order", isAuthenticated, validateSchema(createOrderSchema),
    new CreateOrderController().handle)
router.get("/orders", isAuthenticated, new ListOrdersController().handle)
router.post("/order/add", isAuthenticated, validateSchema(addItemSchema),
    new AddItemController().handle)
router.delete("/order/remove", isAuthenticated, new RemoveItemController().handle)
router.get("/order/detail", isAuthenticated, new DetailOrderController().handle)
router.put("/order/send", isAuthenticated, validateSchema(sendOrderSchema), new SendOrderController().handle)
router.put("/order/finish", isAuthenticated, validateSchema(finishOrderSchema), new FinishOrderController().handle)

export { router }