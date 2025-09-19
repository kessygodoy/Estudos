import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import News from './pages/News'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Olá!</h1>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/news' element={<News />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
