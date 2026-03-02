import { db } from "@/db";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  // 3 - Resgatando dados do banco
  const todos = await db.todo.findMany()
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start text-white">
        <Link href={"/todos/create"}>Ir para criação de todo</Link>
        <h1>Todos!</h1>
        <div className="space-y-4 w-full">
          {todos.map(todo => (
            <div key={todo.id} className="flex space-x-2 mt-3">
              <div className="bg-gray-800 rounded-lg shadow px-4 py-1 w-full h-full flex justify-between">
                <div>
                  <p className="text-xl font-bold">{todo.titulo}</p>
                  <p className="text-gray-400">{todo.descricao}</p>
                  <p className={`flex flex-row justify-end ${todo.status === "pendente" ? "text-red-700" : "text-green-500"}`}>{todo.status}</p>
                </div>
                <div className="flex space-x-2 my-auto flex-col w-25">
                  <Link href="/" className="bg-gray-500 px-2  w-full m-1 text-center rounded-md text-white font-bold">Visualizar</Link>
                  <Link href="/" className="bg-gray-500 px-2  w-full m-1 text-center rounded-md text-white font-bold">Editar</Link>
                  <Link href="/" className="bg-red-500 px-2  w-full m-1 text-center rounded-md text-white font-bold">Excluir</Link>
                </div>
              </div>

            </div>

          ))}
        </div>
      </main >
    </div >
  );
}
