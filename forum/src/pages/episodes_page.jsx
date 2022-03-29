import React from "react"
import Breadcrumbs from "../components/breadcrumbs"
import OneEpi from "../components/episodes/oneEpi"

const EpisodesPage = () => {
    return (
        <div className="wrapper">
            <div className='epi-links'>
                <a href="/episodes/template">Новая тема</a>
                <Breadcrumbs name="Эпизоды" />
            </div>
            <OneEpi />
        </div>
    )
}

export default EpisodesPage
