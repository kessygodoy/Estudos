import { Link, useSearchParams } from "react-router-dom"
import { useFetch } from "../hooks/useFetch"

const Search = () => {
    const [searchParams] = useSearchParams()

    const url = "http://localhost:3000/products?name_like=" + searchParams

    const {data: items, loading, error} = useFetch(url)
    
  return (
    <div>
      <h1>Resultados disponíveis:</h1>
              {items && items.map((item) => (
          <li key={item.id}>
            <h1>{item.id}</h1>
            <h3>{item.name}</h3>
            <p>R$: {item.price}</p>
            <Link to={`/products/${item.id}`}>Ver mais</Link> 
          </li>
        ))}
    </div>
  )
}

export default Search
