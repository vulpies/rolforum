/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Helmet } from "react-helmet";
import { useParams } from 'react-router-dom'
import Breadcrumbs from '../breadcrumbs'
import EpiSendPostFrom from '../forms/epiSendPostForm'
import { commonFetch } from '../../helpers/commonFetch'
import SingleEpiHeader from './singleEpiHeader'
import SingleEpiPost from './singleEpiPost'
import { useTranslation } from "react-i18next";
import Loading from '../../helpers/loading'


const SingleEpi = () => {
	const { t } = useTranslation();
	const { epiId } = useParams()
	const [epiData, setEpiData] = useState('')
	const [postData, setPostData] = useState([])

	const addNewPost = (value) => {
		setPostData([...postData, value])
	}

	useEffect(() => {
		commonFetch(`https://api.postscriptum.games/v1/episode-view/${epiId
			}`, (data) => {
				setEpiData(data);
				setPostData(data.posts);
			})
	}, [])

	return (
		<>
			<Helmet>
				<meta name="description" content={epiData?.episode?.title} />
				<title>{`${epiData?.episode?.fandoms.length > 1 ? epiData?.episode?.fandoms.join(', ') : epiData?.episode?.fandoms[0]} — ${epiData?.episode?.title}`}</title>
			</Helmet>

			{epiData ?
				<div className="wrapper">
					<div className='sepi-bread-header extra'>
						<Breadcrumbs name={epiData.episode.title} link='/episodes' extraName={t("components.singleEpi.episodes")} />
					</div>

					<SingleEpiHeader header={epiData.episode} />
					<hr className='hr-underline' />

					<SingleEpiPost posts={postData} />

					{epiData.can_reply ? <EpiSendPostFrom updatePosts={addNewPost} /> : ''}

				</div> : <Loading />}
		</>
	)
}

export default SingleEpi