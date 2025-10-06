import getSession from "@/lib/getSession"
import { redirect } from "next/navigation";
import { getUserData } from "./_data-access/get-info-user";

export default async function Profile(){
        const session = await getSession();
    
        if(!session) {
            redirect("/")
        }

        const user = await getUserData({userId: session.user.id})
        console.log("GetUserData: ", user)

    return(
        <section>
            <h1>Pagina perfil</h1>
        </section>
    )
}