import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import "./filme.css";

function Filme() {

    const { id } = useParams();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function LoadFilme() {
            const response = await api.get(`/movie/${id}`);
            console.log(response.data);
            setFilme(response.data);
            setLoading(false);
        }
        LoadFilme();
    }, [])

    if (loading) {
        return (
            <div className="loading">
                <h1>Carregando Filmes...</h1>
            </div>
        )
    }
    return (
        <div className="container"  >
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/w500/${filme.poster_path}`} alt={filme.title} />

            <p>{filme.overview}</p>
            <strong>Lançamento: {filme.release_date}</strong>
            <strong>Nota: {filme.vote_average}</strong>
        </div>
    );
}

export default Filme;
