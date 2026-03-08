import { deleteTodo, toggleTodoStatus } from "@/actions";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import { db } from "@/db";
import Link from "next/link";

// export const revalidate = 20;
//com esse export o next vai revalidar a pagina(cache) a cada 20 segundos

// export const dynamic = "force-dynamic"
//exportando force-dynamic o next vai revalidar a pagina(cache) a cada requisição


export default async function Home() {
  // 3 - Resgatando dados do banco
  const todos = await db.todo.findMany()

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-16  sm:items-start">
        <h1>Todos!</h1>
        <div className="space-y-4 w-full">
          {todos.map(todo => (
            <div key={todo.id} className={`flex  bg-gray-400 space-x-2 rounded-lg justify-between mt-3 shadow-lg ${todo.status === "pendente" ? "border-gray-400 border-3" : "border-green-500 border-3"}`}>

              <div className="shadow px-4 py-1  h-full w-full flex justify-between">
                <div>
                  <h2 className="text-xl font-bold">{todo.titulo}</h2>
                  <p className="text-gray-600">{todo.descricao}</p>

                  <div className="flex space-x-2 my-auto w-25">
                    <Link href={`/todos/${todo.id}`} className="bg-blue-400 px-2  w-full m-1 text-center rounded-md text-white font-bold">Visualizar</Link>
                    <Link href={`/todos/${todo.id}/edit`} className="bg-orange-400 px-2  w-full m-1 text-center rounded-md text-white font-bold">Editar</Link>
                    <form action={deleteTodo}>
                      <input type="hidden" name="id" value={todo.id} />
                      <Button className="bg-red-500 px-2  w-full m-1 text-center rounded-md text-white font-bold">Excluir</Button>
                    </form>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <p className="italic"></p>
                  <form action={toggleTodoStatus}>
                    <input type="hidden" name="id" value={todo.id} />
                    <Checkbox checked={todo.status === "completa"} />
                  </form>


                  <p className={`flex flex-row justify-end ${todo.status === "pendente" ? "text-red-700" : "text-green-500"}`}>{todo.status}</p>
                </div>

              </div>


            </div>

          ))}
        </div>
      </main >
    </div >
  );
}
