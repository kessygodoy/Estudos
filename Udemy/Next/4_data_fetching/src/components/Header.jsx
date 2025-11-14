import Link from "next/link";


export default function Header() {
  return (
    <header className="bg-gray-900 text-white p-4">
        <nav className="container mx-auto flex justify-between">
            <Link href="/">Lista de tarefas</Link>
            <Link href="/todos/create">Criar de tarefa</Link>
        </nav>
    </header>
  );
}