import { cookies } from "next/headers";
import { apiClient } from "./api";
import { User } from "./types";

const COOKIE_NAME = "token_pizzaria";

export async function getToken(): Promise<string | undefined> {
    const cookieStore = await cookies();
    return cookieStore.get(COOKIE_NAME)?.value;
}

export async function setToken(token: string) {
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true, // não pode ser acessado pelo cliente
        maxAge: 60 * 60 * 24 * 30, // duração do cookie
        path: "/", // caminho do cookie //colocando só / faz com que o cookie seja enviado para todas as rotas
        sameSite: true, // evita ataques de cross-site
        secure: process.env.NODE_ENV === "production", // apenas em produção
    })
}

export async function removeToken() {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
}

export async function getUser(): Promise<User | null> {
    try {
        const token = await getToken();

        if (!token) return null;

        const user = await apiClient<User>("/me", {
            token: token
        })

        return user;
    } catch (error) {
        return null;
    }
}