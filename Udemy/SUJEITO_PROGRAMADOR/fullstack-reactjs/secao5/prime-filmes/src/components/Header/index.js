import { Link } from "react-router-dom";
import "./header.css";

function Header() {
    return (
        <header>
            <Link className="logo" href="/">
                <h3>
                    Prime filmes
                </h3>
            </Link>
            <Link className="favoritos" href="/favoritos">Meus filmes</Link>
        </header>
    );
}

export default Header;