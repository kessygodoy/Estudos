import { Container } from "../../Components/Container";
import { CountDown } from "../../Components/CountDown";
import { MainForm } from "../../Components/MainForm";
import { MainTemplate } from "../../templates/MainTemplate";

export function Home() {

  return (
    <MainTemplate>
        <Container>
            <CountDown/>
        </Container>
        <Container>
            <MainForm/>
        </Container>
    </MainTemplate>
  );
}

