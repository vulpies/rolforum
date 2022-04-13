import React from 'react'
import Breadcrumbs from '../components/breadcrumbs'

const Outgame = () => {
	return (
		<div className="wrapper">

			<div className='epi-links'>
				<a href="/outgame/chat">Открыть флуд</a>
				<Breadcrumbs name="Вне игры" />
			</div>
		</div>
	)
}

export default Outgame