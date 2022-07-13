import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../../components/breadcrumbs'
import { commonFetch } from '../../../helpers/commonFetch'

const News = () => {
	const { t } = useTranslation();
	const [user] = useSelector((state) => state.usersReducer.user)
	const [news, setNews] = useState()
	const [news111, setNews111] = useState()
	const navigate = useNavigate()

	console.log(news, 888)

	useEffect(() => {
		commonFetch('https://api.postscriptum.games/v1/news-list', setNews)
		commonFetch(`https://api.postscriptum.games/v1/news-view/1`, setNews111)
	}, [setNews])

	console.log(news111, 1111)
	return (
		<div className='wrapper'>

			<div className='epi-links extra' style={{ "alignItems": "baseline" }}>

				{user?.roles.find(role => role === "ROLE_MODERATOR") ? <a href="/news/template">{t("pages.organization_page.create_news")}</a> : ''}

				<Breadcrumbs name={t("components.breadcrumbs.news")} />
			</div>

			<div className="news-wrapper">
				{news?.map(item => {
					return <div className="news-single" key={item.id}>
						<p className="news-single__date">{item.created_at}</p>
						<p className="news-single__title">{item.title}</p>

						<p className="news-single__content" dangerouslySetInnerHTML={{
							__html: `${item.content?.replace(/\s-\s/gm, ' — ').slice(0, 150)}`
						}} />

						<button className="btns btns-read news-single-btn" onClick={() => navigate(`/org/news/${item.id}`)}>Читать</button>
					</div>
				})}
			</div>
		</div>
	)
}

export default News