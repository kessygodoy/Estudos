"use server"

import { apiClient } from "@/lib/api"
import { redirect } from "next/navigation";

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
        await apiClient("/users", {
            body: JSON.stringify(data),
            method: "POST"
        })

        return { success: true, error: "", redirectTo: "/login" }
    } catch (error: any) {
        if (error instanceof Error) {
            return { success: false, error: error.message }
        }

        return { success: false, error: "Erro ao registrar" }
    }
}