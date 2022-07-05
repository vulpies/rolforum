import React, { useRef, useEffect, useState } from "react"
import { useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { userLogout } from "../../store/usersSlice"
import { MenuContext } from "./NavState"
import OneLink from "./OneNavLink"
import {t} from "i18next";

const NavLinks = () => {
    const userAuth = useSelector((state) => state.usersReducer.auth)
    const [user] = useSelector((state) => state.usersReducer.user)
    const browserWidth = document.documentElement.clientWidth
    const dispatch = useDispatch()
    const { isMenuOpen, toggleMenuMode } = useContext(MenuContext)

    const clickHandler = () => {
        if (browserWidth < 1440) {
            toggleMenuMode()
        }
    }

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
        toggleMenuMode()
    }

    const moderRole = user?.roles.find(item => item === "ROLE_MODERATOR")
    const adminRole = user?.roles.find(item => item === "ROLE_ADMIN")

    return (
        <>
            {userAuth === true ?
                (<>
                    <OneLink
                        className={`menu-link ${isMenuOpen}`}
                        to='/'
                        style={({ isActive }) =>
                            isActive ? menunav : undefined
                        }
                        onClick={clickHandler}
                        name={t("navlinks_index")} />

                    {adminRole ? <OneLink
                        className={`menu-link ${isMenuOpen}`}
                        to='/admin'
                        style={({ isActive }) =>
                            isActive ? menunav : undefined
                        }
                        onClick={clickHandler}
                        name="Админка" /> : ''}

                    {moderRole ? <OneLink
                        className={`menu-link ${isMenuOpen}`}
                        to='/moder'
                        style={({ isActive }) =>
                            isActive ? menunav : undefined
                        }
                        onClick={clickHandler}
                        name="Модерка" /> : ''}

                    <OneLink
                        className={`menu-link ${isMenuOpen}`}
                        to={`/profile/${user.user_id}`}
                        style={({ isActive }) =>
                            isActive ? menunav : undefined
                        }
                        onClick={clickHandler}
                        name="Профиль" />

                    <OneLink
                        className={`menu-link ${isMenuOpen}`}
                        to='/org'
                        style={({ isActive }) =>
                            isActive ? menunav : undefined
                        }
                        onClick={clickHandler}
                        name=" Орг. темы" />

                    <OneLink
                        className={`menu-link ${isMenuOpen}`}
                        to='/episodes'
                        style={({ isActive }) =>
                            isActive ? menunav : undefined
                        }
                        onClick={clickHandler}
                        name="Эпизоды" />

                    <OneLink
                        className={`menu-link ${isMenuOpen}`}
                        to='/outgame'
                        style={({ isActive }) =>
                            isActive ? menunav : undefined
                        }
                        onClick={clickHandler}
                        name="Вне игры" />
                    <OneLink
                        className={`menu-link ${isMenuOpen}`}
                        to='/chats'
                        style={({ isActive }) =>
                            isActive ? menunav : undefined
                        }
                        onClick={clickHandler}
                        name="Чаты" />

                    <OneLink
                        className={`menu-link ${isMenuOpen}`}
                        to='/piar'
                        style={({ isActive }) =>
                            isActive ? menunav : undefined
                        }
                        onClick={clickHandler}
                        name="Партнеры" />

                    <OneLink
                        className={`menu-link ${isMenuOpen}`}
                        to='/exit'
                        style={({ isActive }) =>
                            isActive ? menunav : undefined
                        }
                        onClick={handleLogout}
                        name="Выйти" />

                </>)
                : (<>
                    <OneLink
                        className={`menu-link ${isMenuOpen}`}
                        to='/'
                        style={({ isActive }) =>
                            isActive ? menunav : undefined
                        }
                        onClick={clickHandler}
                        name={t("navlinks_index")} />

                    <OneLink
                        className={`menu-link ${isMenuOpen}`}
                        to='/episodes'
                        style={({ isActive }) =>
                            isActive ? menunav : undefined
                        }
                        onClick={clickHandler}
                        name="Эпизоды" />

                    <OneLink
                        className={`menu-link ${isMenuOpen}`}
                        to='/piar'
                        style={({ isActive }) =>
                            isActive ? menunav : undefined
                        }
                        onClick={clickHandler}
                        name="Пиар" />
                </>
                )
            }
        </>
    )
}

export default NavLinks
