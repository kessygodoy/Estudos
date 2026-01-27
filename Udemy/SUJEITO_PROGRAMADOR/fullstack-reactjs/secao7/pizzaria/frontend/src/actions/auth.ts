"use server"

export async function registerAction(
    prevState: { success: boolean; error: string } | null,
    formData: FormData
) {
    console.log("Ação de registro")
    const email = formData.get("email")
    const name = formData.get("name")
    const password = formData.get("password")
    const password_confirmation = formData.get("password_confirmation")
    console.log(email, name, password, password_confirmation)

    return { success: true, error: "" }
}