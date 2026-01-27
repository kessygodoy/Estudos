"use client"
import { useState, useActionState } from "react"
import Link from "next/link"
import { Button } from "../ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { registerAction } from "@/actions/auth"


export function RegisterForm() {

    const [state, formAction, isPending] = useActionState(registerAction, null)

    return (
        <Card className="bg-app-card border-app-border w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-white text-center text-2xl sm:text-3xl font-bold"><span className="text-brand-primary">Pix</span>Lottery</CardTitle>
                <CardDescription>Register your account</CardDescription>
            </CardHeader>

            <CardContent>
                <form className="space-y-4" action={formAction}>
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-white">Nome</Label>
                        <Input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Digite seu nome"
                            required
                            minLength={3}
                            className="text-white bg-app-card border-app-border"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">Email</Label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Digite seu email"
                            required
                            className="text-white bg-app-card border-app-border"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-white">Senha</Label>
                        <Input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Digite sua senha"
                            required
                            className="text-white bg-app-card border-app-border"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password_confirmation" className="text-white">Confirme sua senha</Label>
                        <Input
                            type="password"
                            id="password_confirmation"
                            placeholder="Confirme sua senha"
                            required
                            className="text-white bg-app-card border-app-border"
                        />
                    </div>

                    <Button type="submit" className="w-full bg-brand-primary hover:bg-brand-primary/80">
                        {isPending ? "Criando conta..." : "Criar conta"}
                    </Button>

                    <p className="text-center text-gray-400 mt-4 text-sm">Já tem uma conta?{" "}
                        <Link href="/login" className="text-brand-primary font-semibold">
                            Faça o Login</Link></p>
                </form>
            </CardContent>

        </Card>
    )
}