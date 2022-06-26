import React, { useState, useEffect } from 'react'
import { commonFetch } from '../../helpers/commonFetch'
import Breadcrumbs from '../breadcrumbs'

const CharacterApplication = () => {
	const [info, setInfo] = useState()

	useEffect(() => {
		commonFetch('https://api.postscriptum.games/v1/moderate/character-application-list', setInfo)

	}, [setInfo])

	console.log(info, 'infoinfoinfo')

	const apps = info?.map(item => (
		<div className='cards-common' key={item.id}>
			<a href={`/char_app/${item.id}`}><span>[{item.fandom_name}]</span> {item.character_name}</a>
			<p>{item.user_name}</p>
		</div>
	))


	return (
		<div className='wrapper'>

			<div className='sepi-bread-header extra'>
				<Breadcrumbs name="Анкеты" link='/moder' extraName="Модерка" />
			</div>

			<div className='cards-wrapper'>
				{apps}
			</div>
		</div>
	)
}

export default CharacterApplication