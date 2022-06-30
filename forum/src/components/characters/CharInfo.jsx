import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { commonFetch } from '../../helpers/commonFetch'

const CharInfo = () => {
	const [char, setChar] = useState()
	const search = useParams();
	// /v1/character-view/{id}

	useEffect(() => {
		commonFetch(`https://api.postscriptum.games/v1/character-view/${search.charId}`, setChar)
	}, [setChar, search.charId])

	console.log(char, 'char')
	return (
		<div className='wrapper'>CharInfo</div>
	)
}

export default CharInfo