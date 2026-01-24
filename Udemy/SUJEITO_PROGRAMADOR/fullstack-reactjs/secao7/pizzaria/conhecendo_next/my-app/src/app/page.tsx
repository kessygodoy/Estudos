import { OwnerRepo } from "@/components/OwnerRepo";
import Link from "next/link";

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

async function getData() {
  // await new Promise((resolve) => setTimeout(resolve, 2000))
  const response = await fetch('https://api.github.com/users/kessygodoy/repos',
    {
      cache: "no-store"
    }
  )

  return response.json();
}

export default async function Home() {
  const data: DataProps[] = await getData();

  // console.log(data)

  return (
    <main>
      <h1>Home</h1>
      <span>Seja bem vindo a pagina home</span>


      <h3>Meus repositórios</h3>
      {data.map((item) => (
        <div key={item.id}>
          <h2>{item.name}</h2>
          <span>{item.full_name}</span>
          <OwnerRepo
            avatar_url={item.owner.avatar_url}
            name={item.owner.login}
          />
          <br />
          {/* <img src={item.owner.avatar_url} alt="" /> */}
        </div>
      ))}
    </main>
  )
}