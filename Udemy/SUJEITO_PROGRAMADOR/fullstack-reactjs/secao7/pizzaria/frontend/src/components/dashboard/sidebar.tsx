"use client"

import { ShoppingCart, Package, Tags, LogOut } from "lucide-react";
import { CardTitle } from "../ui/card";
import Logo from "../ui/logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import path from "path";
import { Button } from "../ui/button";
import { logoutAction } from "@/actions/auth";

interface SidebarProps {
    userName: string;
}

const menuItems = [
    {
        title: "Pedidos",
        href: "/dashboard",
        icon: ShoppingCart
    },
    {
        title: "Produtos",
        href: "/dashboard/products",
        icon: Package
    },
    {
        title: "Categorias",
        href: "/dashboard/categories",
        icon: Tags
    }
]

export function Sidebar({ userName }: SidebarProps) {
    const pathname = usePathname();

    return (
        < aside className="hidden lg:flex flex-col w-64 bg-gray-800 h-screen" >
            {/*HEADER */}
            <div className="border-b border-app-border">
                <h2>
                    <Logo />
                </h2>
                <p className="text-sm text-gray-400 mt-1 p-4">Olá, {userName}</p>
            </div>
            {/*MENU*/}
            <nav className="flex-1">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (

                        <Link
                            href={item.href}
                            key={item.href}
                            className={`flex items-center gap-2 p-2 m-2 rounded-md hover:bg-gray-700 ${isActive ? "bg-brand-primary" : ""}`}>
                            <item.icon className="size-5" />
                            {item.title}
                        </Link>
                    )
                })}
            </nav>

            <div className="border-t border-app-border p-4">
                <form action={logoutAction}>
                    <Button className="w-full flex items-center gap-3 rounded-md hover:bg-gray-700">
                        <LogOut className="size-5" />
                        Sair
                    </Button>
                </form>
            </div>
        </aside >
    )
}