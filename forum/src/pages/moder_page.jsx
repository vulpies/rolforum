import React from 'react'
import Breadcrumbs from '../components/breadcrumbs'
import CharacterApplication from '../components/character_application/CharacterApplication'

const ModerPage = () => {

	return (
		<div className='wrapper'>
			<div className='epi-links single-link'>
				<Breadcrumbs name="Модерка" />
			</div>
			Moder
			<CharacterApplication />
		</div>
	)
}

export default ModerPage