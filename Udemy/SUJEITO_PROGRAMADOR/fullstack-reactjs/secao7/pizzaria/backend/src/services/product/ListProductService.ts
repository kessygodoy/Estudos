import prismaClient from "../../prisma";

class ListProductService {
    async execute({disabled}: {disabled?: boolean}){
        try {
            const products = await prismaClient.product.findMany({
                where: {
                    disabled: disabled 
                },
                select: {
                    id: true,
                    name: true,
                    price: true,
                    description: true,
                    banner: true,
                    disabled: true,
                    category: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    createdAt: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })

            return products
        } catch (error) {
            throw new Error("Falha ao listar produtos")
        }
    }
}

export { ListProductService }
