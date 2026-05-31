import NextAuth, { NextAuthConfig } from "next-auth";
import google from "next-auth/providers/google";

const config = {
    providers: [google],
} satisfies NextAuthConfig;

export const { handlers: { GET, POST }, signIn, signOut, auth } = NextAuth(config);