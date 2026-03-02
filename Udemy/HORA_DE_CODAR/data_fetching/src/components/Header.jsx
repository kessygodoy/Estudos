import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <header className='bg-blue-500 text-white py-4 px-6'>
            <nav className='container mx-auto flex justify-between'>
                <Link href="/">Todos</Link>
                <Link href="/todos/create">Criar Todo</Link>
            </nav>
        </header>
    )
}

export default Header