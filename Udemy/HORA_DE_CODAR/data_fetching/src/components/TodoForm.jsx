"use client"

import { updateTodo } from "@/actions"
import { useFormState } from "react-dom"

const TodoForm = ({ todo }) => {
    const [formState, action] = useFormState(updateTodo, { errors: [] })

    return (
        <form action={action} className='flex flex-col gap-1 pw-4 bg-white shadow-lg rounded-lg'>

            {formState.errors ? (
                <p className="text-red-500">{formState.errors}</p>
            ) : null}

            <input type="hidden" name="id" value={todo.id} />
            <label htmlFor="titulo" className='block text-sm mt-4 font-medium text-gray-700'>Título</label>
            <input defaultValue={todo.titulo} placeholder="Insira o titulo" id="titulo" name="titulo" className=' px-4 border border-gray-400 rounded-md w-full' />
            {/* o formulario no next envia os dados sem necessidade de states, enviam pelo name do input */}
            <label htmlFor="titulo" className='block text-sm mt-4 font-medium text-gray-700'>Descrição</label>
            <textarea defaultValue={todo.descricao} placeholder="Insira a descrição" id="descricao" name="descricao" className='h-32  px-4 border border-gray-400 rounded-md w-full' />
            <button type="submit" className='bg-blue-500 px-4 py-2 rounded-md mt-4 mb-4 w-full text-white font-bold'>Atualizar Todo</button>
        </form>
    )
}

export default TodoForm