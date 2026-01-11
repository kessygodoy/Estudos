import { z } from "zod";

export const createOrderSchema = z.object({
    body: z.object({
        table: z.number({message: "Número da mesa deve ser um número"}).int({message: "Número da mesa deve ser um inteiro"}).min(1, {message: "Número da mesa deve ser maior que 0"}),
        name: z.string({message: "Nome deve ser um texto"}).min(1, {message: "Nome é obrigatório"}),
    })
})
