"use client"
import Link from "next/link";
import styles from "./header.module.css"
import { usePathname } from "next/navigation";

export function Header() {
    const path = usePathname()
    return (
        <header className={styles.header}>
           <h1><span className={styles.logo}>Sua</span><span className={styles.logo2}>Sorte</span></h1>
           <div className={styles.links}>
           <Link className={`link ${path === "/" ? 'active' : "" }`}href="/">Home</Link>
           <Link className={`link ${path === "/contatos" ? 'active' : "" }`} href="/contatos">Contatos</Link>
           <Link className={`link ${path === "/repositorios" ? 'active' : "" }`} href="/repositorios">Repositorios</Link>
           <Link className={`link ${path === "/dashboard" ? 'active' : "" }`} href="/dashboard">Painel</Link>
           </div>
        </header>
    )
}