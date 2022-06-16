import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../components/breadcrumbs'
import { commonFetch } from '../helpers/commonFetch'
import ModerCards from '../helpers/moder_cards'

const ModerPage = () => {
	const [info, setInfo] = useState()

	useEffect(() => {
		commonFetch('https://api.postscriptum.games/v1/moderate/character-application-list', setInfo)

	}, [setInfo])

	const data = info ? info : ''


	return (
		<div className='wrapper'>
			<div className='epi-links single-link'>
				<Breadcrumbs name="Модерка" />
			</div>

			<div className='cards-wrapper'>
				<ModerCards
					className='cards-common'
					link='/char_app'
					name='Анкеты'
					length={data?.length}
				/>

				<ModerCards
					className='cards-common'
					link='/char_app'
					name='Анкеты'
					length={data?.length}
				/>

				<ModerCards
					className='cards-common'
					link='/char_app'
					name='Анкеты'
					length={data?.length}
				/>
			</div>

		</div>
	)
}

export default ModerPage