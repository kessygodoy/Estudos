import { getTodoById } from '@/actions';
import React from 'react'

const TodoEdit = async ({ params }) => {
    const id = Number(params.id);

    const todo = await getTodoById(id)

    return (
        <div>
            <h1>Editando: {todo.titulo}</h1>
            {/* { form } */}
        </div>
    )
}

export default TodoEdit