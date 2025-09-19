import { Link, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

const Product = () => {
    // 4 - rota dinamica
    const { id } = useParams();

    // 5 - Carregamento de dado individual
    const url = `http://localhost:3000/products/` + id

    const {data: product, loading, error} = useFetch(url)

  return (
    <>
      {error && <p>{error}</p>}
      {loading && <p>Carregando...</p>}
      {product && (
        <div>
            <h1>{product.name}</h1>.
            <p>R$: {product.price}</p>
            { /* 6 - nested routes */ }
            <Link to={`products/${product.id}/info`}>Mais informações</Link>
        </div>
      )}
    </>
  )
}

export default Product
