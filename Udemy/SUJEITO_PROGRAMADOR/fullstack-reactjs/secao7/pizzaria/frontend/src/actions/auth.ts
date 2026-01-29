"use server"

import { apiClient } from "@/lib/api"
import { User } from "@/lib/types"

export async function registerAction(
    prevState: { success: boolean; error: string; redirectTo?: string } | null,
    formData: FormData
) {


    try {
        const email = formData.get("email")
        const name = formData.get("name")
        const password = formData.get("password")

        const data = {
            name,
            email,
            password,
        }
        const user = await apiClient<User>("/users", {
            method: "POST",
            body: JSON.stringify(data)
        })



        return { success: true, error: "", redirectTo: "/login" }
    } catch (error: any) {
        if (error instanceof Error) {
            return { success: false, error: error.message }
        }

        return { success: false, error: "Erro ao registrar" }
    }
}