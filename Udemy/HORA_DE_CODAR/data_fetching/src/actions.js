"use server"

import { db } from "./db"
import { redirect } from "next/navigation"

export const deleteTodo = async (formData) => {
    const id = Number(formData.get("id"))
    await db.todo.delete({
        where: {
            id: id
        }
    })
    redirect("/")
}