import Image from "next/image";
import styles from "./page.module.css"
import MyComponent from "./components/MyComponent";
import Container from "./components/Container";
import Button from "./components/Button";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black dark:text-white sm:items-start">
        {/*1 - CSS Global*/}
        <h1>Meu título</h1>
        {/*2 - CSS Modules */}
        <h2 className={styles.heading_module}> Meu CSS Modules</h2>
        <div className={styles.container}>
          <p>Testando CSS Modules</p>
        </div>
        <div className={styles.container}>
          <h3>Teste 2</h3>
        </div>
        {/*3 - tailwind */}
        <MyComponent />
        {/*4 - SASS */}
        <Container />
        {/*5 - SASS com CSS Modules */}
        <Button />
      </main>
    </div>
  );
}
