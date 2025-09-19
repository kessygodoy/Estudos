//2 - links com react router

import "./Navbar.css"
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      {/* <Link to="/">Home</Link>
      <Link to="/About" >About</Link> */}
      <NavLink to="/" className={({isActive}) => {
        return isActive ? 'active' : ''
      }}>Home</NavLink>
      <NavLink to="/About" >About</NavLink>
    </nav>
  )
}

export default Navbar
