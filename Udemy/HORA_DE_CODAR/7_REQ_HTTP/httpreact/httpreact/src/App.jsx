import { useEffect, useState } from 'react'
import './App.css'

// 4 - Custom hook
import { useFetch } from './hooks/useFetch'

const url = "http://localhost:3000/products"

function App() {
  const [products, setProducts] = useState([])

  //4 - custom hook
  const { data: items, httpConfig, loading } = useFetch(url)

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")

  // // 1 - resgatando dados
  // useEffect(() => {

  //   async function fetchData() {
  //   const res = await fetch(url)

  //   const data = await res.json()

  //   setProducts(data)
  //   }

  //   fetchData()
  // }, [])

  // 2 - addicionando dados

  const handleSubmit = async (e) => {
    e.preventDefault()

    const product = {
      name,
      price,
      key: Math.random() * 1000
    }

    // const res = await fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(product)
    // })

    // setProducts([...products , product])

    // 5 - refatorando o post
    httpConfig(product, "POST")
    setName("")
    setPrice("")
  }


  return (
    <div className="App">
      <h1>Lista de produtos:</h1>
      {/* 6- loading */}
      {loading && <p>Carregando dados...</p>}
      {!loading && <ul>
        {items && items.map(product => (
          <li key={product.id}>{product.name} - R$: {product.price}</li>
        ))}
      </ul>}

      <div className="add-product">
        <form onSubmit={handleSubmit}>
          <label >
            Nome:
            <input type="text" value={name} name="name" onChange={e => setName(e.target.value)} />
          </label>
          <label >
            Preço:
            <input type="text" value={price} name="price" onChange={e => setPrice(e.target.value)} />
          </label>
          {!loading && <input type="submit" value={"criar"} />}
          {loading && <input type="submit" value={"Aguarde"} />}

        </form>
      </div>
    </div>
  )
}

export default App
