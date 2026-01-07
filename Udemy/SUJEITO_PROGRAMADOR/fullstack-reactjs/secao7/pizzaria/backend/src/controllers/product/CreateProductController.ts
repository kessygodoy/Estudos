import { Request, Response } from "express";
import { CreateProductService } from '../../services/product/CreateProductService'

class CreateProductController {
    async handle(req: Request, res: Response){
        
        const createProductService = new CreateProductService()

        const product = await createProductService.execute()
        
        res.json(product)
    }

}

export { CreateProductController }