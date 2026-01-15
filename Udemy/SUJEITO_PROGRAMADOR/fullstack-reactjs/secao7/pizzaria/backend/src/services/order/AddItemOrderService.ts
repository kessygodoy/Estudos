import prismaClient from "../../prisma";

interface ItemProps {
    order_id: string;
    product_id: string;
    amount: number;
}

class AddItemOrderService {
    async execute({ order_id, product_id, amount }: ItemProps) {
        try {
            const orderExists = await prismaClient.order.findFirst({
                where: {
                    id: order_id
                }
            })

            if (!orderExists) {
                throw new Error("Pedido nao encontrado")
            }

            const productExists = await prismaClient.product.findFirst({
                where: {
                    id: product_id,
                    disabled: false
                }
            })
            if (!productExists) {
                throw new Error("Produto nao encontrado")
            }

            const item = await prismaClient.item.create({
                data: {
                    order_id,
                    product_id,
                    amount
                },
                select: {
                    id: true,
                    amount: true,
                    product_id: true,
                    order_id: true,
                    createdAt: true,
                    product: {
                        select: {
                            id: true,
                            name: true,
                            price: true,
                            description: true,
                            banner: true
                        }
                    }
                }
            })

            return item;

        } catch (error) {
            console.log(error)
            throw new Error("Erro ao adicionar item ao pedido")
        }
    }
}

export { AddItemOrderService }