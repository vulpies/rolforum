import React, { useContext } from "react"
import { MenuContext } from "./NavState"

const HamburgerButton = () => {
    const { isMenuOpen, toggleMenuMode } = useContext(MenuContext)

    const clickHandler = () => {
        toggleMenuMode()
    }

    return (
        <button
            className={isMenuOpen ? "menu-btn active" : "menu-btn"}
            aria-label="Открыть главное меню"
            onClick={clickHandler}
        >
            <span className="menu-span"></span>
            <span className="menu-span"></span>
            <span className="menu-span"></span>

        </button>
    )
}

export default HamburgerButton
