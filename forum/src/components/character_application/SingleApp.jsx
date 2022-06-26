import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { commonFetch } from '../../helpers/commonFetch'
import Breadcrumbs from '../breadcrumbs'

const SingleApp = () => {
	const { appId } = useParams()
	const [appData, setAppData] = useState('')

	useEffect(() => {
		commonFetch(`https://api.postscriptum.games/v1/character-application-view/${appId}`, setAppData)
	}, [setAppData])

	console.log(appData, 'appData')

	return (
		<div className='wrapper'>

			<div className='sepi-bread-header extra'>
				<Breadcrumbs name={appData?.name} link='/char_app' extraName="Анкеты" />
			</div>

			{appData ?
				<>
					<div className='char-app__header'>
						<p className='char-app__header-date'>{appData?.created_at?.date}</p>
					</div>

					<div className='char-app__wrapper'>
						<div className='char-app__name'>
							{appData?.fandom_name ? <span>[{appData?.fandom_name}]</span> : ''}
							<p>{appData?.name}</p>
						</div>

						<div className='char-app__avatar'>
							<img src={appData?.avatar} className='profile-avatar-img' alt='' />
						</div>

						<div className='create-char-desc' dangerouslySetInnerHTML={{
							__html: `${appData?.description}`
						}} />
					</div>
				</> :
				<p style={{ textAlign: 'center' }}>Загрузка данных...</p>
			}


		</div>
	)
}

export default SingleApp