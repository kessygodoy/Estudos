import { useState, useEffect } from 'react';
import './style.css'
//https://sujeitoprogramador.com/rn-api/?api=posts

function App() {
  const [nutri, setNutri] = useState([]);

  useEffect(() => {
    async function loadApi() {
      let url = "https://sujeitoprogramador.com/rn-api/?api=posts"
      const posts = await fetch(url)
      setNutri(await posts.json())
    }

    loadApi();
  }, [])

  return (
    <div className=''>
      <header>React NUTRI</header>
      {nutri.map((item) => (
        <article key={item.id} className='post'>
          <strong className='titulo'>{item.titulo}</strong>
          <img src={item.capa} className='capa' alt={item.titulo} />
          <p className='subtitulo'>{item.subtitulo}</p>
          <a href="" className='botao'>Acessar</a>
        </article>
      ))}
    </div>
  );
}

export default App;
