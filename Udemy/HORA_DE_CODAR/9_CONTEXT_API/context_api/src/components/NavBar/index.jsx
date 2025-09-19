import React from 'react'
import { NavLink } from 'react-router-dom'
// import styles from './styles.module.css'
import "./styles.css"

const NavBar = () => {
    return (
        <div className="navbar">
            <NavLink to="/" className="navbarItem">
                Home
            </NavLink >
            <NavLink to="/about" className="navbarItem">
                About
            </NavLink>
            <NavLink to="/news" className="navbarItem">
                News
            </NavLink>
        </div>
    )
}

export default NavBar
