import { useState } from 'react'

import './App.css'

// 1 - Config React Router
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Navbar from './components/Navbar'
import Product from './pages/Product'
import Info from './pages/Info'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <h1>React Router</h1>

      <BrowserRouter>
        { /*2 - links com react router */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          {/*6 - nested routes /*/}
          <Route path='/products/:id/info' element={<Info />} />
          {/*4 - Rota dinamica*/}
          <Route path='/products/:id' element={<Product />} />


        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
