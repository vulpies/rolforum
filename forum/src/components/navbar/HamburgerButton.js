import React, { useContext } from "react"
import styled from "styled-components"
import { MenuContext } from "./NavState"

const MenuButton = styled.button`
    display: block;
    transform-origin: 16px 11px;
    margin-right: 20px;
    outline: 0;
    border: 0;
    padding: 12px;
    background: none;
    span {
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }

    :hover {
        span:nth-of-type(1) {
            width: 33px;
        }
        span:nth-of-type(2) {
            width: 40px;
        }
        span:nth-of-type(3) {
            width: 30px;
        }
    }
    &.active {
        span:nth-of-type(1) {
            transform: rotate(45deg) translate(10px, 10px);
            width: 40px;
        }
        span:nth-of-type(2) {
            opacity: 0;
            pointer-events: none;
        }
        span:nth-of-type(3) {
            transform: rotate(-45deg) translate(7px, -7px);
            width: 40px;
        }
    }
`

const Bar = styled.span`
    display: block;
    width: 36px;
    height: 5px;
    margin-bottom: 7px;
    background-color: #fff;
`

const HamburgerButton = () => {
    const { isMenuOpen, toggleMenuMode } = useContext(MenuContext)

    const clickHandler = () => {
        toggleMenuMode()
    }

    return (
        <MenuButton
            className={isMenuOpen ? "active" : ""}
            aria-label="Открыть главное меню"
            onClick={clickHandler}
        >
            <Bar />
            <Bar />
            <Bar style={{ marginBottom: 0 }} />
        </MenuButton>
    )
}

export default HamburgerButton
