import prismaClient from "../../prisma";

interface FinishOrderProps {
    order_id: string;
}

class FinishOrderService {
    async execute({ order_id }: FinishOrderProps) {
        try {
            const order = await prismaClient.order.findFirst({
                where: {
                    id: order_id
                }
            })

            if (!order) {
                throw new Error("Pedido não encontrado")
            }

            // atualiza a propriedade draft para false ( enviar para cozinha)
            const updatedOrder = await prismaClient.order.update({
                where: {
                    id: order_id
                },
                data: {
                    status: true
                },
                select: {
                    id: true,
                    table: true,
                    name: true,
                    draft: true,
                    status: true,
                    createdAt: true,
                }
            })

            return updatedOrder;
        } catch (error) {
            console.log(error)
            throw new Error("Falha ao enviar pedido")
        }
    }
}

export { FinishOrderService }
