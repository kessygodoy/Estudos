import Link from "next/link";
import styles from "./header.module.css"

export function Header() {
    return (
        <header className={styles.header}>
           <h1><span className={styles.logo}>Sua</span><span className={styles.logo2}>Sorte</span></h1>
           <div className={styles.links}>
           <Link href="/">Home</Link>
           <Link href="/contatos">Contatos</Link>
           <Link href="/repositorios">Repositorios</Link>
           <Link href="/dashboard">Dashboard</Link>
           </div>
        </header>
    )
}