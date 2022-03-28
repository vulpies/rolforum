import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { NavLink } from "react-router-dom"

const NavLinks = () => {

    let activeStyle = {
        color: "#f6a31b",
        opacity: 1
    }

    let activeStyle2 = {
        color: 'red',
        opacity: 1
    }

    const [menunav, setMenu] = useState(activeStyle)

    const browserWidth = document.documentElement.clientWidth

    useEffect(() => {
        if (browserWidth > 1440) {
            setMenu(activeStyle2)
        } else {
            setMenu(activeStyle)
        }
    }, [menunav])

    return (
        <>
            <NavLink className="menu-link" to='/' style={({ isActive }) =>
                isActive ? menunav : undefined
            }>
                Главная
            </NavLink>
            <NavLink className="menu-link" to="/profile" style={({ isActive }) =>
                isActive ? menunav : undefined}>
                Профиль
            </NavLink>
            <NavLink className="menu-link" to="/org" style={({ isActive }) =>
                isActive ? menunav : undefined}>
                Орг. темы
            </NavLink >
            <NavLink className="menu-link" to="/episodes" style={({ isActive }) =>
                isActive ? menunav : undefined}>
                Эпизоды
            </NavLink>
            <NavLink className="menu-link" to="/outgame" style={({ isActive }) =>
                isActive ? menunav : undefined}>
                Вне игровое
            </NavLink>
            <NavLink className="menu-link" to="/registration" style={({ isActive }) =>
                isActive ? menunav : undefined}>
                Регистрация
            </NavLink>
            <NavLink className="menu-link" to="/exit" style={({ isActive }) =>
                isActive ? menunav : undefined}>
                Войти / выйти
            </NavLink>
        </>
    )
}

export default NavLinks
