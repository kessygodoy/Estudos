import Link from "next/link";


export default function CategoryPage() {
  return (
    <>
        <h1>Conheça nossas roupas</h1>
        <Link href={"/produtos/categorias/roupas/camisa_gola_v"}>Camisa gola V</Link>
    </>
  );
}