import { db } from '../../../db'
import React from 'react'

const TodoPage = async ({ params }) => {

    const { id } = await params

    const todo = await db.todo.findFirst({
        where: {
            id: Number(id)
        }
    })

    return (
        <div>
            <h1>Titulo: {todo.titulo}</h1>
            <p>Descrição: {todo.descricao}</p>
            <p>Status: {todo.status}</p>
        </div>
    )
}

export default TodoPage