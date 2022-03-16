import React, { useContext } from "react"
import styled, { css } from "styled-components"
import NavLinks from "./NavLinks"
import { MenuContext } from "./NavState"

const Menu = styled.nav`
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    z-index: 293;
    display: block;
    width: 425px;
    max-width: 100%;
    margin-top: 0px;
    padding-top: 64px;
    padding-right: 0px;
    align-items: stretch;
    background-color: #fffcc6;
    transform: translateX(-100%);
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

    ${(props) =>
        props.open &&
        css`
            transform: translateX(0);
        `}
`

export const SideMenu = () => {
    const { isMenuOpen } = useContext(MenuContext)

    return (
        <Menu open={isMenuOpen}>
            <NavLinks />
        </Menu>
    )
}
