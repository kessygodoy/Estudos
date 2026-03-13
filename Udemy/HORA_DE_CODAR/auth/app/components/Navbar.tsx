import { auth, signIn, signOut } from "auth";
import Link from "next/link";

const Navbar = async () => {
    const session = await auth();

    return (
        <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <Link
                    className="hover:text-gray-400 font-bold"
                    href="/">Home</Link>

            </div>
            <div>
                {session ? (
                    <div className="flex items-center gap-4">
                        <p>Bem vindo(a), {session.user?.name?.split(' ')[0]}</p>
                        {/* <p>{session.user?.email}</p> */}
                        <img
                            className="rounded-full"
                            width={50}
                            height={50}
                            src={session.user?.image || ''} alt="" />
                        <form action={async () => {
                            'use server'
                            await signOut();
                        }}>
                            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">Sair</button>
                        </form>
                    </div>
                ) : (
                    <form action={async () => {
                        'use server'
                        await signIn();
                    }}>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Entrar</button>
                    </form>
                )}
            </div>
        </div>
    )
}

export default Navbar