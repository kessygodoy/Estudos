import { useNavigate } from "react-router-dom"
//useNavigate é um hook que permite navegação programática

import { useState } from "react"

const SearchForm = () => {
    const navigate = useNavigate() //Hook para navegar programaticamente
    const [query, setQuery] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()
        //navega para a página de busca com o query
        navigate(`/search?name_like=${query}`)
    }

  return (
    <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setQuery(e.target.value)} />
        <input type="submit" value="Buscar" />
    </form>
  )
}

export default SearchForm
