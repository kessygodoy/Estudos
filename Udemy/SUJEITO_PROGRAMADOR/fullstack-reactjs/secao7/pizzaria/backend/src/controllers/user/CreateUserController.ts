import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";
import {hash} from "bcryptjs"

class CreateUserControlller {
    async handle(req: Request, res: Response) {
        const { name, email, password } = req.body;

        // console.log(name, email, password);

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({name, email, password});

        return res.json(user);
    }
}

export {CreateUserControlller}