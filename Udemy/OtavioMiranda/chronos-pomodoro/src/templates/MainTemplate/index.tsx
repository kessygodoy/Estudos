import { Container } from "../../Components/Container";
import { Footer } from "../../Components/Footer";
import { Logo } from "../../Components/Logo";
import { Menu } from "../../Components/Menu";

type MainTemplateProps = {
    children: React.ReactNode;
}

export function MainTemplate({children}: MainTemplateProps) {

  return (
    <>
      <Container>
        <Logo />
      </Container>

      <Container>
        <Menu />
      </Container>

        {children}
      
      <Container>
        <Footer />
      </Container>
    </>
  );
}

