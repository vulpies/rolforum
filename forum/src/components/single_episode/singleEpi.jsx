/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
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
	const { data: epiData, isSuccess } = useGetPostsQuery(epiId)

	console.log(epiData, 'epiData')

	return (
		<>
			{isSuccess ?
				<>
					<Helmet>
						<meta name="description" content={epiData?.episode?.title} />
						<title>{`${epiData?.episode?.fandoms.length > 1 ? epiData?.episode?.fandoms.join(', ') : epiData?.episode?.fandoms[0]} — ${epiData?.episode?.title}`}</title>
					</Helmet>

					<div className="wrapper">
						<div className='sepi-bread-header extra'>
							<Breadcrumbs name={epiData.episode.title} link='/episodes' extraName={t("components.singleEpi.episodes")} />
						</div>
						<SingleEpiHeader header={epiData.episode} />
						<hr className='hr-underline' />
						<SingleEpiPost />
						{epiData.can_reply ? <EpiSendPostFrom /> : ''}
					</div>
				</> : <Loading />}
		</>
	)
}

export default SingleEpi