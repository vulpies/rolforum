import React, { useRef, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { userLogout } from "../../store/usersSlice"

const NavLinks = () => {
    const userAuth = useSelector((state) => state.usersReducer.auth)
    const browserWidth = document.documentElement.clientWidth
    const dispatch = useDispatch()
    console.log(userAuth, '9999')

    let activeStyle = {
        color: "#f6a31b",
        opacity: 1
    }

    let activeStyle2 = {
        color: 'red',
        opacity: 1
    }

    const ref1 = useRef(activeStyle)
    const ref2 = useRef(activeStyle2)

    const [menunav, setMenu] = useState(ref1.current)

    useEffect(() => {
        if (browserWidth > 1440) {
            setMenu(ref2.current)
        } else {
            setMenu(ref1.current)
        }
    }, [menunav, browserWidth])

    const handleLogout = () => {
        dispatch(userLogout())
        localStorage.removeItem('token')
        localStorage.removeItem('username')
    }

    return (
        <>
            {userAuth === true ?
                (<>
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
                    <NavLink className="menu-link" to='/exit' style={({ isActive }) =>
                        isActive ? menunav : undefined} onClick={handleLogout}>
                        Выйти
                    </NavLink>
                </>)
                : (<>
                    <NavLink className="menu-link" to='/' style={({ isActive }) =>
                        isActive ? menunav : undefined
                    }>
                        Главная
                    </NavLink>

                    <NavLink className="menu-link" to="/episodes" style={({ isActive }) =>
                        isActive ? menunav : undefined}>
                        Эпизоды
                    </NavLink>

                    <NavLink className="menu-link" to="/registration" style={({ isActive }) =>
                        isActive ? menunav : undefined}>
                        Регистрация
                    </NavLink>
                </>)
            }
        </>
    )
}

export default NavLinks
