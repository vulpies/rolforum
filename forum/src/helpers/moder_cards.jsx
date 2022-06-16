import React from 'react'
import { Link } from 'react-router-dom'

const ModerCards = ({ className, name, length, link }) => {
	return (
		<>
			<div className={className}>
				<Link to={link}>{name}</Link>
				{length === 0 ? <p className='moder-grey'>Новых тем нет</p> : <p>Новых тем: <span>{length}</span></p>}
			</div>
		</>
	)
}

export default ModerCards