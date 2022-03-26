import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Breadcrumbs from '../../components/breadcrumbs'
import NavbarCommon from '../../components/navbar/navbar_common'
import SingleEpiHeader from './singleEpiHeader'
import SingleEpiPost from './singleEpiPost'

const SingleEpi = () => {
	const { epiId } = useParams()
	const [epiData, setEpiData] = useState('')

	const url = `https://api.rolecrossways.com/v1/episode-view/${epiId
		}`

	useEffect(() => {
		axios.get(url)
			.then(res => setEpiData(res.data))
			.catch(err => console.log(err))
	}, [setEpiData])

	// console.log(epiData)

	return (<>
		<NavbarCommon />
		{epiData ?
			<div className="wrapper">
				<div className='sepi-bread-header extra'>
					<Breadcrumbs name={epiData.episode.title} link='/episodes' extraName="Эпизоды" />
				</div><hr />
				<SingleEpiHeader header={epiData.episode} />
				<hr />
				<SingleEpiPost posts={epiData.posts} />
			</div> : 'Что-то пошло не так'}
	</>
	)
}

export default SingleEpi