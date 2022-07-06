/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Breadcrumbs from '../breadcrumbs'
import EpiSendPostFrom from '../forms/epiSendPostForm'
import { commonFetch } from '../../helpers/commonFetch'
import SingleEpiHeader from './singleEpiHeader'
import SingleEpiPost from './singleEpiPost'
import { useTranslation } from "react-i18next";


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

	}, [setEpiData, setPostData])

	console.log(epiData, 888)


	return (
		<>
			{epiData ?
				<div className="wrapper">
					<div className='sepi-bread-header extra'>
						<Breadcrumbs name={epiData.episode.title} link='/episodes' extraName={t("components.singleEpi.episodes")} />
					</div>

					<SingleEpiHeader header={epiData.episode} />
					<hr className='hr-underline' />

					<SingleEpiPost posts={postData} />

					{epiData.can_reply ? <EpiSendPostFrom updatePosts={addNewPost} /> : ''}

				</div> : <div className="wrapper"><p style={{ 'textAlign': 'center' }}>{t("components.singleEpi.loading")}</p></div>}
		</>
	)
}

export default SingleEpi