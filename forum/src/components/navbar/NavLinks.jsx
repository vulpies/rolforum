import React from "react"
import { Link } from "react-router-dom"

const NavLinks = () => {
    return (
        <>
            <Link to="/" className="menu-link">
                Главная
            </Link>
            <Link className="menu-link" to="/episodes">
                Episodes
            </Link>
            <Link className="menu-link" to="/">
                Line2
            </Link>
            <Link className="menu-link" to="/">
                Line3
            </Link>
        </>
    )
}

export default NavLinks
