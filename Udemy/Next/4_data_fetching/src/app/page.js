import Image from "next/image";
import Link from "next/link";

import { db } from "@/db"

export default async function Home() {
  // 3- Resgatando dados do banco
  const todos = await db.todo.findMany();

  return (
    <main className="container mx-auto p-4">
      <Link href="/todos/create">Ir para criação de todo</Link>
      <h1 className="text-2xl font-bold mb-4">Todos!</h1>
      <div className="space-y-4">
        {todos.map((todo) => (
          <div key={todo.id} className="bg-gray-100  rounded-lg shadow bg-gray-900 p-1 pb-3 px-4">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold pt-1">{todo.titulo}</h2>
                <p>{todo.descricao}</p>
                
              </div>
              <div className="flex space-x-2 mt-3">
                <Link
                  href={"/"}
                  className="bg-gray-800 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
                >Visualizar
                </Link>
                <Link
                  href={"/"}
                  className="bg-gray-800 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
                >Editar
                </Link>
                <Link
                  href={"/"}
                  className="bg-gray-800 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
                >Excluir
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
