/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Helmet } from "react-helmet";
import { useParams } from 'react-router-dom'
import Breadcrumbs from '../breadcrumbs'
import EpiSendPostFrom from '../forms/epiSendPostForm'
import SingleEpiHeader from './singleEpiHeader'
import SingleEpiPost from './singleEpiPost'
import { useTranslation } from "react-i18next";
import Loading from '../../helpers/loading'
import { useGetPostsQuery } from '../../store/apiSlice';


const SingleEpi = () => {
	const { t } = useTranslation();
	const { epiId } = useParams()
	const { data, isLoading, isFetching } = useGetPostsQuery(epiId)

	console.log(data, 'data')

	const EpiData = data?.episode
	const posts = data?.posts

	if (isLoading || isFetching) return <Loading />

	return (
		<>
			<Helmet>
				<meta name="description" content={data.episode.title} />
				<title>{`${EpiData.fandoms.length > 1 ? EpiData.fandoms.join(', ') : EpiData.fandoms[0]} — ${EpiData.title}`}</title>
			</Helmet>

			<div className="wrapper">
				<div className='sepi-bread-header extra'>
					<Breadcrumbs name={EpiData.title} link='/episodes' extraName={t("components.singleEpi.episodes")} />
				</div>
				<SingleEpiHeader header={EpiData} />
				<hr className='hr-underline' />
				<SingleEpiPost posts={posts} />
				{data.can_reply ? <EpiSendPostFrom /> : ''}
			</div>
		</>
	)
}

export default SingleEpi