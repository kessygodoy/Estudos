"use client"

// Usar com use (hook) tem que estar em um ambiente client
 
import {useSearchParams} from "next/navigation";

export default function ExemploPage() {
    const searchParams = useSearchParams();
    //coloca o useSearchParams dentro de uma variavel

    const valorParams = searchParams.get("parametro")

  return (
    <div>
        <h1>Exibindo resultados para o parametro: {valorParams}</h1>
    </div>
);
}