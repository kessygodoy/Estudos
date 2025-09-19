import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './styles.module.css'

const NavBar = () => {
    return (
        <div className={styles.navbar}>
            <NavLink to="/" className={styles.navbarItem}>
                Home
            </NavLink >
            <NavLink to="/about" className={styles.navbarItem}>
                About
            </NavLink>
            <NavLink to="/news" className={styles.navbarItem}>
                News
            </NavLink>
        </div>
    )
}

export default NavBar
