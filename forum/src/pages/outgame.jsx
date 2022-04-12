import React from 'react'
import Breadcrumbs from '../components/breadcrumbs'
import Flood from '../components/Flood'

const Outgame = () => {
	return (
		<div className="wrapper">
			<div className='epi-links'>
				<a href="/episodes/template">Новая тема</a>
				<Breadcrumbs name="Зона флуда" />
			</div>
			<Flood />
		</div>
	)
}

export default Outgame