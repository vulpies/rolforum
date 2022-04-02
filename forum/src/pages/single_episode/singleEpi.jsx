import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Breadcrumbs from '../../components/breadcrumbs'
import { commonFetch } from '../../helpers/commonFetch'
import SingleEpiHeader from './singleEpiHeader'
import SingleEpiPost from './singleEpiPost'

const SingleEpi = () => {
	const { epiId } = useParams()
	const [epiData, setEpiData] = useState('')

	const url = `https://api.rolecrossways.com/v1/episode-view/${epiId
		}`

	console.log(epiData, 'epiData')


	useEffect(() => {
		commonFetch(url, setEpiData)

	}, [setEpiData, url])

	return (<>
		{epiData ?
			<div className="wrapper">
				<div className='sepi-bread-header extra'>
					<Breadcrumbs name={epiData.episode.title} link='/episodes' extraName="Эпизоды" />
				</div>
				<hr />
				<SingleEpiHeader header={epiData.episode} />
				<hr />
				<SingleEpiPost posts={epiData.posts} />
			</div> : <div className="wrapper"><p style={{ 'textAlign': 'center' }}>Загрузка данных...</p></div>}
	</>
	)
}

export default SingleEpi