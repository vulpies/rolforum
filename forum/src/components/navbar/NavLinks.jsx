import React from "react"
import { Link } from "react-router-dom"

const NavLinks = () => {
    return (
        <>
            <Link to="/" className="menu-link">
                Главная
            </Link>
            <Link className="menu-link" to="/">
                Орг. темы
            </Link>
            <Link className="menu-link" to="/episodes">
                Эпизоды
            </Link>
            <Link className="menu-link" to="/">
                Вне игровое
            </Link>
            <Link className="menu-link" to="/">
                Войти / выйти
            </Link>
        </>
    )
}

export default NavLinks
