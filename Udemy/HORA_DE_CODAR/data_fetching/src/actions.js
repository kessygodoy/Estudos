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

export const addTodo = async (formData) => {
    // 2 - Inserir no banco de dados
    const titulo = formData.get("titulo")
    const descricao = formData.get("descricao")
    const status = "pendente"

    const todo = await db.todo.create({
        data: {
            titulo,
            descricao,
            status
        }
    })

    redirect("/")
}

export const findTodoById = async (id) => {
    const todo = await db.todo.findFirst({
        where: {
            id: Number(id)
        }
    })
    return todo
}