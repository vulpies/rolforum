import React from "react"
import { Link, NavLink } from "react-router-dom"

const NavLinks = () => {

    let activeStyle = {
        color: "#f6a31b",
        opacity: 1
    };

    return (
        <>
            <NavLink className="menu-link" to='/' style={({ isActive }) =>
                isActive ? activeStyle : undefined
            }>
                Главная
            </NavLink>
            <NavLink className="menu-link" to="/profile" style={({ isActive }) =>
                isActive ? activeStyle : undefined}>
                Профиль
            </NavLink>
            <NavLink className="menu-link" to="/org" style={({ isActive }) =>
                isActive ? activeStyle : undefined}>
                Орг. темы
            </NavLink >
            <NavLink className="menu-link" to="/episodes" style={({ isActive }) =>
                isActive ? activeStyle : undefined}>
                Эпизоды
            </NavLink>
            <NavLink className="menu-link" to="/outgame" style={({ isActive }) =>
                isActive ? activeStyle : undefined}>
                Вне игровое
            </NavLink>
            <NavLink className="menu-link" to="/registration" style={({ isActive }) =>
                isActive ? activeStyle : undefined}>
                Регистрация
            </NavLink>
            <NavLink className="menu-link" to="/exit" style={({ isActive }) =>
                isActive ? activeStyle : undefined}>
                Войти / выйти
            </NavLink>
        </>
    )
}

export default NavLinks
