import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface PayLoad {
    sub: string;
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction){
    
    const authToken = req.headers.authorization;

    if(!authToken){
        return res.status(401).json({
            message: "Token not found"
        })
    }

    const [, token] = authToken.split(" ")

    try {
        const {sub} = verify(token!, process.env.JWT_SECRET as string) as PayLoad

        req.user_id = sub; //user_id foi criado em src/@types/express/index.d.ts

        return next();
    } catch (error) {
        res.status(401).json({
            message: "Token invalid"
        })
    }
   
}