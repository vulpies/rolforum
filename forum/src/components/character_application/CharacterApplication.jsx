import React from 'react'
import { useEffect, useState } from 'react'
import { commonFetch } from '../../helpers/commonFetch'

const CharacterApplication = () => {
	const [info, setInfo] = useState()

	useEffect(() => {
		commonFetch('https://api.postscriptum.games/v1/moderate/character-application-list', setInfo)

	}, [setInfo])

	console.log(info, 'info222')


	return (
		<div className='application'>
			CharacterApplication
		</div>
	)
}

export default CharacterApplication