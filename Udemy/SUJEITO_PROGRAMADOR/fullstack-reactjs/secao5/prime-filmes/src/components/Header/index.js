import { Link } from "react-router-dom";
import "./header.css";

function Header() {
    return (
        <header>
            <Link className="logo" to="/">
                <h3>
                    Prime filmes
                </h3>
            </Link>
            <Link className="favoritos" to="/favoritos">Meus filmes</Link>
        </header>
    );
}

export default Header;