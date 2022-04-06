/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Breadcrumbs from '../../components/breadcrumbs'
import EpiSendPostFrom from '../../components/forms/epiSendPostForm'
import { commonFetch } from '../../helpers/commonFetch'
import SingleEpiHeader from './singleEpiHeader'
import SingleEpiPost from './singleEpiPost'


const SingleEpi = () => {
	const { epiId } = useParams()
	const [epiData, setEpiData] = useState('')
	const [postData, setPostData] = useState([])

	console.log(postData, 'postData')
	console.log(epiData, 'epiData')

	const addNewPost = (value) => {
		const newData = postData
		newData.push(value)
		setPostData([...newData])
	}

	useEffect(() => {
		commonFetch(`https://api.rolecrossways.com/v1/episode-view/${epiId
			}`, (data) => {
				setEpiData(data);
				setPostData(data.posts);
			})

	}, [setEpiData, setPostData])


	return (<>
		<>
			{epiData ?
				<div className="wrapper">
					<div className='sepi-bread-header extra'>
						<Breadcrumbs name={epiData.episode.title} link='/episodes' extraName="Эпизоды" />
					</div>
					<hr />
					<SingleEpiHeader header={epiData.episode} />
					<hr />
					<SingleEpiPost posts={postData} />
					<EpiSendPostFrom updatePosts={addNewPost} />
				</div> : <div className="wrapper"><p style={{ 'textAlign': 'center' }}>Загрузка данных...</p></div>}
		</>
	</>
	)
}

export default SingleEpi