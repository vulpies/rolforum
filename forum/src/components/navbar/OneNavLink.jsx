import React from 'react'
import { NavLink } from 'react-router-dom'

const OneLink = ({ className, to, style, onClick, name }) => {
	return (
		<NavLink
			className={className}
			to={to}
			style={style}
			onClick={onClick}>
			{name}
		</NavLink>
	)
}

export default OneLink