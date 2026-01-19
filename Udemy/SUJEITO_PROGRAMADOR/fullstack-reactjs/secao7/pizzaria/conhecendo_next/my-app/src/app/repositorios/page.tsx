"use client"

import { useEffect, useState } from "react"

interface DataProps {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    id: number;
    avatar_url: string;
    url: string;
  }
}

export default function Repositorios() {
    const [repos, setRepos] = useState<DataProps[]>([])
    
    useEffect(() => {
        const getData = async () => {
            const response = await fetch('https://api.github.com/users/kessygodoy/repos')
            const data: DataProps[] = await response.json()
            setRepos(data)
        }
        getData()
    }, [])

    return (
        <div>
            <h1>Repositorios</h1>
            <span>Pagina de repositorios</span>

            {repos.map((item) => (
                <div key={item.id}>
                    <h2>{item.name}</h2>
                    <span>{item.full_name}</span>
                    <img src={item.owner.avatar_url} alt="" />
                </div>
            ))}
        </div>
    )
}