import "./style.css";

import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

function Home() {
    const [filmes, setFilmes] = useState([]);
    useEffect(() => {
        async function loadFilmes() {
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: "7584b297a707d572723b2d6d1b8ca2af",
                    language: "pt-BR"
                }
            })
            console.log(response.data.results.slice(0, 10));
            setFilmes(response.data.results.slice(0, 10));
        }

        loadFilmes();
    }, [])
    return (
        <div className="container">
            <div className="lista-filmes">
                {filmes.map((filme) => (
                    <article key={filme.id}>
                        <strong>{filme.title}</strong>
                        <img width={200} src={`https://image.tmdb.org/t/p/w500/${filme.poster_path}`} alt={filme.title} />
                        <Link to={`/filme/${filme.id}`}>Acessar</Link>
                    </article>
                ))}
            </div>
        </div>
    );
}

export default Home;
