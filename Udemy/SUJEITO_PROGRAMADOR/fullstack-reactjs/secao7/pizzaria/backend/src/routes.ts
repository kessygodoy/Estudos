import { Request, Response, Router } from "express";

const router = Router();

router.get("/users", (req: Request, res: Response) => {
    return res.send("Hello World!")
})

router.post("/users", (req: Request, res: Response) => {
    return res.send("Hello World!")
})

export { router }