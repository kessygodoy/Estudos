import Button from "./components/Button";
import Container from "./components/Container";
import CustomButton from "./components/CustomButton";
import styles from "./page.module.css"

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {/* 1 - CSS Global */}
      <h1>Meu título</h1>
      {/* 2 - CSS Modules */}
      <h2 className={styles.heading_module}>Meu CSS Modules</h2>
      <div className={styles.container}>
        <p>Testando CSS modules</p>
      </div>
      {/* 4 - SASS */}
      <Container/>
      {/* 5 - sass com css modules */}
      <Button />
      {/* 6 - Styled components */}
      <CustomButton>
        Alo
      </CustomButton>
    </main>
  );
}
