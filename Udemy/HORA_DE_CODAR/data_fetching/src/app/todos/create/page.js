import React from 'react'
import { db } from "@/db"

const TodoPage = () => {

    //formData => seria quase a mesma coisa do useState
    const addTodo = async (formData) => {
        "use server"

        const titulo = formData.get("titulo")
        const descricao = formData.get("descricao")
        const status = "pendente"

        console.log(titulo, descricao);

        const todo = await db.todo.create({
            data: {
                titulo,
                descricao,
                status
            }
        })

        console.log(todo)
    }

    return (
        <div className='max-w-md mx-auto mt-10'>
            <h1 className='text-2xl font-bold text-center mb-6'>
                Criar nova tarefa
            </h1>
            <form action={addTodo} className='flex flex-col gap-1 pw-4 bg-white shadow-lg rounded-lg'>
                <label htmlFor="titulo" className='block text-sm mt-4 font-medium text-gray-700'>Título</label>
                <input placeholder="Insira o titulo" id="titulo" name="titulo" className=' px-4 border border-gray-400 rounded-md w-full' />
                {/* o formulario no next envia os dados sem necessidade de states, enviam pelo name do input */}
                <label htmlFor="titulo" className='block text-sm mt-4 font-medium text-gray-700'>Descrição</label>
                <textarea placeholder="Insira a descrição" id="descricao" name="descricao" className='h-32  px-4 border border-gray-400 rounded-md w-full' />
                <button type="submit" className='bg-blue-500 px-4 py-2 rounded-md mt-4 mb-4 w-full text-white font-bold'>Criar Todo</button>
            </form>

        </div>
    )
}

export default TodoPage