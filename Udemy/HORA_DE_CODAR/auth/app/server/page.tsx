import { auth } from '@/auth';
import React from 'react'

const ServerPage = async () => {
    const session = await auth();

    if (!session || !session.user) return <p>Você precisa estar autenticado! Server Page</p>

    return (
        <div>
            <h1>Página de Servidor</h1>
            <p>Nome: {session.user.name}</p>
            <p>Email: {session.user.email}</p>
            <img src={session.user.image || ''} alt="" />
        </div>
    )
}

export default ServerPage