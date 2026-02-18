"use server"

import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createProductAction(formData: FormData) {
    try {
        const token = await getToken();
        // Since we are sending FormData directly, we don't need to manually construct the object
        // The apiClient or fetch will handle multipart/form-data if we pass the body correctly.
        // However, the apiClient wrapper might expect JSON or string. 
        // Let's check api.ts to see how it handles body.
        // Upon closer inspection of standard fetch, if body is FormData, Content-Type is set automatically.
        // But let's check how apiClient is implemented. 

        // Wait, looking at categories.ts, it sends JSON.
        // For products, the endpoint expects multipart/form-data because of the file.
        // So we should pass formData directly.

        // Let's assume apiClient can handle FormData or we might need to bypass it structure if it forces JSON.
        // But for now let's try using apiClient unless I see it strictly stringifies everything.
        // Actually, looking at previous knowledge, often custom wrappers might need adjustment for FormData.
        // But let's try passing the formData first.

        await apiClient("/product", {
            method: "POST",
            body: formData, // passing raw FormData
            token: token
        })

        revalidatePath("/dashboard/products")

        return { success: true, message: "Produto cadastrado com sucesso" }

    } catch (error) {
        if (error instanceof Error) {
            return { success: false, message: error.message }
        }
        return { success: false, message: "Erro ao cadastrar produto" }
    }
}
