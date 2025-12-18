import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import "./filme.css";

function Filme() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function LoadFilme() {
            await api.get(`/movie/${id}`)
                .then((response) => {
                    console.log(response.data);
                    setFilme(response.data);
                    setLoading(false);
                })
                .catch(() => {
                    setFilme("Filme não encontrado")
                    setLoading(false);
                    navigate("/")
                })
        }
        LoadFilme();

        return () => {
            console.log("Limpeza");
        }
    }, [navigate, id])

    if (loading) {
        return (
            <div className="loading">
                <h1>Carregando Filmes...</h1>
            </div>
        )
    }

    return (
        <div className="container"  >
            <strong>{filme.title}</strong>
            <img clasName="backdrop" src={`https://image.tmdb.org/t/p/w500/${filme.backdrop_path}`} alt={filme.title} />

            <p>{filme.overview}</p>
            <p>Lançamento: {filme.release_date}</p>
            <strong>Nota: {filme.vote_average} / 10</strong>
            <div className="area-buttons">
                <button>Salvar</button>
                <button>
                    <a href={`https://www.youtube.com/results?search_query=trailer+filme+${filme.title}`} target="_blank">Trailer</a>
                </button>
            </div>
        </div>
    );
}

export default Filme;
