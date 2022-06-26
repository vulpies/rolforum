import React from 'react'
import Breadcrumbs from '../components/breadcrumbs'
import Flood from '../components/Flood'

const Chats = () => {
	return (
		<div className='wrapper'>
			<div className='epi-links single-link'>
				<Breadcrumbs name="Чаты" />
			</div>
			<Flood />
		</div>
	)
}

export default Chats