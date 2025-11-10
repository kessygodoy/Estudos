import Image from "next/image";
import Link from "next/link";
import BotaoRedirect from "@/components/BotaoRedirect";


export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {/* Aula 1 - navegação */}
      <h1>Home</h1>
      <Link href={"/sobre"}>Sobre</Link>
      {/* Aula 2 - dados dinamicos */}
      <h1>Acessar posts</h1>
      <Link href={"/posts"}>Posts</Link>
      {/* Aula 3 - parâmetros na URL */}
      <Link href={"/exemplo?parametro=valor"}>Página com parâmetro</Link>
      {/* Aula 4 - nested routes */}
      <Link href={"/produtos/categorias/roupas"} >Ir a categoria de Roupas</Link>
      {/* Aula 7 - Layout aninhados */}
      <Link href={"/dashboard"} >Ir a Dashboard</Link>
      {/* Aula 8 - useRouter */}
      <BotaoRedirect />

    </div>
  );
}
