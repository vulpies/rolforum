import React from 'react'
import Breadcrumbs from '../components/breadcrumbs'
import Form from '../components/create_character/Form'

const CreateCharacter = () => {
	return (
		<div className='wrapper'>
			<div className='epi-links single-link'>
				<Breadcrumbs name="Создать персонажа" />
			</div>

			<Form />
		</div>
	)
}

export default CreateCharacter