import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Breadcrumbs from '../../../components/breadcrumbs'
import { commonFetch } from '../../../helpers/commonFetch'
import Loading from '../../../helpers/loading'
import { EditMsgBtn } from '../../../helpers/editOrRemove'

const SingleNews = () => {
	const { t } = useTranslation();
	const { newsId } = useParams();
	const [user] = useSelector((state) => state.usersReducer.user)
	const [news, setNews] = useState()


	useEffect(() => {
		commonFetch(`https://api.postscriptum.games/v1/news-view/${newsId}`, setNews)
	}, [setNews])

	return (
		<div className='wrapper'>

			<div className='sepi-bread-header extra'>
				<Breadcrumbs name={news?.title} link='/org/news' extraName={t("components.breadcrumbs.news")} />
			</div>

			{news ?
				<div className="single-news-wrapper">
					<div className='single-news-top'>
						<p className="single-news__date">{news.created_at}</p>
						{user?.roles.find(role => role === "ROLE_MODERATOR") ?
							<EditMsgBtn className='single-news-edit sepi-header-desc__items-edit' />
							: ''}
					</div>
					<p className="single-news__title news-single__title">{news.title}</p>
					<p className="single-news__content" dangerouslySetInnerHTML={{
						__html: `${news.content?.replace(/\s-\s/gm, ' — ').slice(0, 150)}`
					}} />
					<p className="single-news__author">Автор: <a href={`/profile/${news.user_id}`}>{news.user_name}</a></p>
				</div>
				: <Loading />}
		</div>
	)
}

export default SingleNews