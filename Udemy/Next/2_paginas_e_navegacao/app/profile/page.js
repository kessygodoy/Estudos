import { redirect } from "next/navigation";

export default function ProfilePage() {

    // true = logado, e false = deslogado
    //chamada para o banco tentando chamar usuario pelo id ou email
    const user = false

    if(!user){
        redirect("/")
    }
    
  return (
    <div>
        <h1>Bem vindo ao perfil

        </h1>
    </div>
  );
}