import prismaClient from "../../prisma";

interface CreateUserProps {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute({name, email, password}: CreateUserProps) {
        console.log({name, email, password})
        
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (userAlreadyExists) {
            throw new Error("User already exists")
        }

        const user = await prismaClient.user.create({
            data: {
                name,
                email,
                password
            }
        })

        return user
    }
}

export { CreateUserService }