import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Home</h1>
      <span>Seja bem vindo a pagina home</span>

      <Link href="/contatos">Contatos</Link>
    </main>
  )
}