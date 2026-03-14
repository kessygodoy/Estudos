import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Link className="text-blue-500 hover:text-blue-600" href="/client">Página de Cliente</Link>
        <Link className="text-blue-500 hover:text-blue-600" href="/server">Página de Servidor</Link>
        <Link className="text-blue-500 hover:text-blue-600" href="/middleware">Página de com middleware</Link>
      </main>
    </div>
  );
}
