"use client"

import {useRouter} from "next/navigation"

export default function BotaoRedirect() {
    const router = useRouter();

    function sendEmailAndRedirect() {
        router.push("/dashboard")
    }
    
  return (
    <button onClick={sendEmailAndRedirect}> Finalizar envio</button>
  );
}