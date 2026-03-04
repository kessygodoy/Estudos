import { findTodoById } from '@/actions';
import TodoForm from '@/components/TodoForm';
import React from 'react'

const TodoEdit = async ({ params }) => {
    const { id } = await params;

    const todo = await findTodoById(id)

    return (
        <div>
            <h1>Editando: {todo.titulo}</h1>
            {/* { form } */}
            <TodoForm todo={todo} />
        </div>
    )
}

export default TodoEdit