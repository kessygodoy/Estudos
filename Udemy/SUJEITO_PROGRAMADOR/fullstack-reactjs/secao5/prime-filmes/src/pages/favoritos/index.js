import { Link } from 'react-router-dom';
import './index.css';
import { useEffect, useState } from 'react';

export default function Favoritos() {
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        function getFilmes() {
            setFilmes(JSON.parse(localStorage.getItem("filmes")));

        }

        getFilmes()
    }, []);

    function apagarFilme(id) {
        const filmesFiltrados = filmes.filter((filme) => filme.id != id)
        localStorage.setItem("filmes", JSON.stringify(filmesFiltrados))
        setFilmes(filmesFiltrados)
    }

    return (
        <>
            <h1>  Meus filmes favoritos</h1>
            <div className="container-fav">

                {filmes.map((filme) => (
                    <div key={filme.id} className="fav-item">
                        <img className="backdrop-favs-img" src={`https://image.tmdb.org/t/p/w500/${filme.backdrop_path}`} alt={filme.title} />
                        <p>Nota: {filme.vote_average} / 10</p>
                        <strong>{filme.title}</strong>
                        <button onClick={() => apagarFilme(filme.id)}>Remover</button>
                        <Link to={`/filme/${filme.id}`}>Ver detalhes</Link>
                    </div>
                ))}
            </div>
        </>
    );
}