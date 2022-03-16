import React, { useRef, useContext } from "react"
import useOnClickOutside from "../../hooks/onClickOutside"
import { MenuContext } from "./NavState"
import HamburgerButton from "./HamburgerButton"
import { SideMenu } from "./SideMenu"

const MainMenu = () => {
    const node = useRef()
    const { isMenuOpen, toggleMenuMode } = useContext(MenuContext)
    useOnClickOutside(node, () => {
        if (isMenuOpen) {
            toggleMenuMode()
        }
    })

    return (
        <header ref={node}>
            <div className="menu-navbar">
                <HamburgerButton />
                <h2>Forum</h2>
            </div>
            <SideMenu />
        </header>
    )
}

export default MainMenu
