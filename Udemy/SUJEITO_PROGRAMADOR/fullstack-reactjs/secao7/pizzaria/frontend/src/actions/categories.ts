"use server"

import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/auth"
import { CategoryType } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function createCategoryAction(formData: FormData) {
    try {
        const token = await getToken();
        const name = formData.get("name");

        const data = {
            name: name
        }

        await apiClient<CategoryType>("/category", {
            method: "POST",
            body: JSON.stringify(data),
            token: token
        })

        revalidatePath("/dashboard/categories")

        return { success: true, message: "Categoria criada com sucesso" }
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, message: error.message }
        }
        return { success: false, message: "Erro ao criar categoria" }
    }
}