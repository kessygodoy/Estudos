import { db } from "@/db";
import { redirect } from "next/navigation";

export default function TodoPage() {

    const addTodo = async(formData) => { //formData é de onde vamos pegar os dados do formulario usando next
        "use server" // precisa do "use server" pois a função é do lado do servidor
        
        const titulo = formData.get("titulo") // dessa forma que é pego o dado do formData
        const descricao = formData.get("descricao")
        const status = "pendente"

        console.log(titulo, descricao)

        //todo é o nome da tabela, e prisma permita acessa-lo diretamente aqui no codigo
        //create insere um conteudo na tabela
        const todo = await db.todo.create({ 
            data: { //data é o objeto utilizado para passar os dados
                titulo,
                descricao,
                status
            }
        })

        console.log(todo)

        redirect("/")
    }
    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold text-center mb-6">Criar nova tarefa</h1>
            <form action={addTodo} className="flex flex-col gap-4 p-4 bg-gray-900 shadow-lg rounded-lg">
                <label htmlFor="titulo" className="block text-sm font-medium text-gray-400">Titulo
                    <input
                        type="text"
                        name="titulo"
                        id="titulo"
                        placeholder="Insira o título"
                        required
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full" />
                </label>
                <label htmlFor="descricao" className="block text-sm font-medium text-gray-400">Descrição
                    <textarea
                        type="text"
                        name="descricao"
                        id="descricao"
                        placeholder="Descreva a tarefa"
                        required
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full h-32" />
                </label>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                > Criar Todo
                </button>
            </form>
        </div>
    );
}