import './index.css';
export default function Favoritos() {
    const filmes = localStorage.getItem("filmes");
    const filmesParse = JSON.parse(filmes) || [];
    return (
        <>
            <h1>  Meus filmes favoritos</h1>
            <div className="container-fav">

                {filmesParse.map((filme) => (
                    <div key={filme.id} className="fav-item">
                        <img className="backdrop-favs-img" src={`https://image.tmdb.org/t/p/w500/${filme.backdrop_path}`} alt={filme.title} />
                        <p>Nota: {filme.vote_average} / 10</p>
                        <strong>{filme.title}</strong>
                    </div>
                ))}
            </div>
        </>
    );
}