"use client"
import { useRouter } from "next/navigation"
// serve para acessar informaçoes da url e para controlar navegaçao

const BotaoRedirect = () => {
    const router = useRouter();

    function sendEmailAndRedirect() {
        //envio de email
        router.push("/dashboard")
        //aqui redireciona o usuario
    }
  return (
    <button onClick={sendEmailAndRedirect}>Enviar Email</button>
)
}

export default BotaoRedirect