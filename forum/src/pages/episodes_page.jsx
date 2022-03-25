import React from "react"
import Breadcrumbs from "../components/breadcrumbs"
import OneEpi from "../components/episodes/oneEpi"
import NavbarCommon from "../components/navbar/navbar_common"

const EpisodesPage = () => {
    return (
        <>
            <NavbarCommon />

            <div className="wrapper">
                <div className='epi-links'>
                    <a href="/">Новая тема</a>
                    <Breadcrumbs name="Эпизоды" />
                </div>
                <OneEpi />
            </div>
        </>
    )
}

export default EpisodesPage
