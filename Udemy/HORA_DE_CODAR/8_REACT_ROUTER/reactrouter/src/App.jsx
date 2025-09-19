import { useState } from 'react'

import './App.css'

// 1 - Config React Router
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Navbar from './components/Navbar'
import Product from './pages/Product'
import Info from './pages/Info'
import NotFound from './pages/NotFound'
import SearchForm from './components/SearchForm'
import Search from './pages/Search'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <h1>React Router</h1>

      <BrowserRouter>
        { /*2 - links com react router */}
        <Navbar />
        {/* 9 - search params */}
        <SearchForm />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          {/*4 - Rota dinamica*/}
          <Route path='/products/:id' element={<Product />} />
          {/*6 - nested routes /*/}
          <Route path='/products/:id/info' element={<Info />} />
          {/* 9 - search params */}
          <Route path="/search" element={<Search/>} />
          {/*7 - no match route*/}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
