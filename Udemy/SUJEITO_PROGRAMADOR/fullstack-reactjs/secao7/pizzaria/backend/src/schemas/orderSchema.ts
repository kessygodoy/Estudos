import { z } from "zod";

export const createOrderSchema = z.object({
    body: z.object({
        table: z.number({ message: "Número da mesa deve ser um número" }).int({ message: "Número da mesa deve ser um inteiro" }).min(1, { message: "Número da mesa deve ser maior que 0" }),
        name: z.string({ message: "Nome deve ser um texto" }).min(1, { message: "Nome é obrigatório" }),
    })
})

export const addItemSchema = z.object({
    body: z.object({
        order_id: z.string({ message: "ID do pedido deve ser uma string" }),
        product_id: z.string({ message: "ID do produto deve ser uma string" }),
        amount: z.number({ message: "Quantidade deve ser um número" }).int({ message: "Quantidade deve ser um inteiro" }).min(1, { message: "Quantidade deve ser maior que 0" }),
    })
})

export const sendOrderSchema = z.object({
    body: z.object({
        order_id: z.string({ message: "ID do pedido deve ser uma string" }),
        name: z.string({ message: "Nome deve ser um texto" }).min(1, { message: "Nome é obrigatório" }),
    })
})

export const finishOrderSchema = z.object({
    body: z.object({
        order_id: z.string({ message: "ID do pedido deve ser uma string" }),
    })
})