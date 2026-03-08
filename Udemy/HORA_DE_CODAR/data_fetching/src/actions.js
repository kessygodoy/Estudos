"use server"

import { revalidatePath } from "next/cache"
import { db } from "./db"
import { redirect } from "next/navigation"

export const deleteTodo = async (formData) => {
    const id = Number(formData.get("id"))
    await db.todo.delete({
        where: {
            id: id
        }
    })

    revalidatePath("/")
    // revalidate faz com que o cache seja invalidado e a pagina seja renderizada novamente
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
    revalidatePath("/")
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


export const updateTodo = async (formState, formData) => {
    const id = formData.get("id")
    const titulo = formData.get("titulo")
    const descricao = formData.get("descricao")

    try {
        if (titulo.length < 3) {
            return { errors: "Titulo deve ter pelo menos 3 caracteres" }
        }

        if (descricao.length < 10) {
            return { errors: "Descricao deve ter pelo menos 10 caracteres" }
        }

        await db.todo.update({
            where: {
                id: Number(id)
            },
            data: {
                titulo,
                descricao
            }
        })
        redirect(`/todos/${id}`)

    } catch (error) {
        throw new Error("Ops!")
    }
}
export async function toggleTodoStatus(formData) {
    const todoId = Number(formData.get("id"))

    const todo = await db.todo.findFirst({
        where: { id: todoId }
    })

    if (!todo) {
        throw new Error("Todo não existe!")
    }

    const novoStatus = todo.status === "pendente" ? "completa" : "pendente";

    await db.todo.update({
        where: {
            id: todoId
        },
        data: {
            status: novoStatus
        }
    })
    revalidatePath("/")
    redirect("/")
}