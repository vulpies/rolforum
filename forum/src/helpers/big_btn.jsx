import React from 'react'

const CommonBigBtn = ({ className, classNameBtn, onClick, name }) => {
	return (
		<div className={className}>
			<button className={classNameBtn} onClick={onClick}>{name}</button>
		</div>
	)
}

export default CommonBigBtn