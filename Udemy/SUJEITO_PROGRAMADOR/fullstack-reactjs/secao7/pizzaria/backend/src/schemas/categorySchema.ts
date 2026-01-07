import { z } from "zod";

export const createCategorySchema = z.object({
    body: z.object({
        name: z.string({message: "Nome deve ser um texto"}).min(3, {message: "Nome deve ter pelo menos 3 caracteres"}),
    })
})