//2 - links com react router

import "./Navbar.css"
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/About" >About</Link>
    </nav>
  )
}

export default Navbar
