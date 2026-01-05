import { compare } from "bcryptjs";
import prismaClient from "../../prisma";
import { sign } from "jsonwebtoken";

interface AuthUserServiceProps {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({ email, password }: AuthUserServiceProps) {
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (!user) {
            throw new Error("Email/Senha invalidos")
        }

        const passwaordMatch = await compare(password, user.password)

        if (!passwaordMatch) {
            throw new Error("Email/Senha invalidos")
        }

        //gerar token jwt
        const token = sign({
            name: user.name,
            email: user.email
        }, process.env.JWT_SECRET as string, {
            subject: user.id,
            expiresIn: "30d"
        })
        

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token
        }
    }
}

export { AuthUserService }