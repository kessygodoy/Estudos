import Link from 'next/link'
import React from 'react'

const TodoNotFound = () => {
    return (
        <div className='flex min-h-screen items-center flex-col justify-center bg-zinc-50 font-sans'>
            <div className='text-red-500 text-2xl'>Todo não encontrado</div>
            <Link href="/" >Voltar para home</Link>
        </div>
    )
}

export default TodoNotFound