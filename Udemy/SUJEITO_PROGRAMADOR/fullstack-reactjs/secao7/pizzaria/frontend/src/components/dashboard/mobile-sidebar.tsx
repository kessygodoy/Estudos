"use client"

import { ShoppingCart, Package, Tags, LogOut, Menu } from "lucide-react";
import Logo from "../ui/logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { logoutAction } from "@/actions/auth";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { useState } from "react";

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

export function MobileSidebar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    return (
        <div className="lg:hidden">
            <header className="sticky top-0 z-50 border-b border-app-border bg-app-card">
                <div className="flex h-16 items-center justify-between px-4">
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="size-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-64 p-0 bg-app-sidebar border-app-border">
                            <SheetHeader className="border-b border-app-border p-6">
                                <SheetTitle className="flex items-center justify-center">
                                    <Logo />
                                </SheetTitle>
                            </SheetHeader>
                            <nav className="flex flex-col text-white">
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
                            <div className="absolute bottom-0 w-full border-t border-app-border p-4">
                                <form action={logoutAction}>
                                    <Button className="w-full flex gap-3 rounded-md hover:bg-gray-700">
                                        <LogOut className="size-5" />
                                        Sair
                                    </Button>
                                </form>
                            </div>
                        </SheetContent>
                    </Sheet>

                    <div className="flex items-center justify-center flex-1">
                        <Logo />
                    </div>

                </div>
            </header>
        </div>
    )
}