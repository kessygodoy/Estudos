import prismaClient from "../../prisma";

interface ListOrdersServiceProps {
    draft?: string;
}

class ListOrdersService {
    async execute({ draft }: ListOrdersServiceProps) {

        const orders = await prismaClient.order.findMany({
            where: {
                draft: draft === "true"
            },
            select: {
                id: true,
                table: true,
                name: true,
                status: true,
                draft: true,
                createdAt: true,
                items: {
                    select: {
                        id: true,
                        amount: true,
                        product: {
                            select: {
                                name: true,
                                price: true,
                                id: true,
                                description: true,
                                banner: true
                            }
                        }
                    }
                }
            }
        })

        return orders

    }
}

export { ListOrdersService }