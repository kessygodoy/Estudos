"use client"

import { useSession } from "next-auth/react"

const ClientPage = () => {

    const { data: session, status } = useSession();

    if (!session || !session.user) return <p>Você precisa estar autenticado!</p>

    return (
        <div>
            <h1>Página de Cliente</h1>
            <p>Nome: {session.user.name}</p>
            <p>Email: {session.user.email}</p>
            <img src={session.user.image || ''} alt="" />
        </div>
    )
}

export default ClientPage