import prismaClient from "../../prisma";

interface ListProductByCategoryServiceProps {
    category_id: string;
}

class ListProductByCategoryService {
    async execute({ category_id }: ListProductByCategoryServiceProps){
        try {
            // Verificar se a categoria existe
            const categoryExists = await prismaClient.category.findFirst({
                where: {
                    id: category_id
                }
            });

            if(!categoryExists){
                throw new Error("Categoria não encontrada");
            }

            // Buscar produtos da categoria
            const products = await prismaClient.product.findMany({
                where: {
                    category_id: category_id,
                    disabled: false  // Apenas produtos ativos
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
            });

            return products;
        } catch (error) {
            if(error instanceof Error){
                throw error;
            }
            throw new Error("Falha ao listar produtos da categoria");
        }
    }
}

export { ListProductByCategoryService }
