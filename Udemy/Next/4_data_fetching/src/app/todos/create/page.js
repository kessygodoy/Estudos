export default function TodoPage() {

    const addTodo = async (formData) => {
        "use server"

        console.log(formData)
    }

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold text-center mb-6">Criar nova tarefa</h1>
            <form action={addTodo} className="flex flex-col gap-4 p-4 bg-gray-900 text-white shadow-lg rounded-lg">
                <label htmlFor="titulo" className="block text-sm font-medium text-gray-400">Título
                    <input
                        id="titulo"
                        name="titulo"
                        type="text"
                        placeholder="Insira o título"
                        required
                        className="mt-1 px-4 border border-gray-700 rounded-md w-full"
                    />
                </label>
                <label htmlFor="descricao" className="block text-sm font-medium text-gray-400">Descrição
                    <textarea
                        id="descricao"
                        name="descricao"
                        type="text"
                        placeholder="Descreva a tarefa"
                        required
                        className="mt-1 px-4 border border-gray-700 rounded-md w-full h-32"
                    />
                </label>
                <button type="submit" className="bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >Criar tarefa</button>
            </form>
        </div>
    );
}