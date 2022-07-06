import React from "react"
import Breadcrumbs from "../components/breadcrumbs"
import OneEpi from "../components/episodes/oneEpi"
import {useTranslation} from "react-i18next";

const EpisodesPage = () => {
    const { t } = useTranslation();
    return (
        <div className="wrapper">
            <div className='epi-links'>
                <a href="/episodes/template">{t("pages.episodes_page.new_episode")}</a>
                <Breadcrumbs name={t("pages.episodes_page.episodes")} />
            </div>
            <OneEpi />
        </div>
    )
}

export default EpisodesPage
