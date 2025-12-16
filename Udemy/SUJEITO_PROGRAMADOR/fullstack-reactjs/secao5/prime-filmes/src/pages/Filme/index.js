import { useParams } from "react-router-dom";

function Filme() {

    const { id } = useParams();

    return (
        <div>
            <h1>Filme {id}</h1>
        </div>
    );
}

export default Filme;
