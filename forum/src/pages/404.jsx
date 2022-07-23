import React from 'react'
import notFound from '../images/not_found.png'

const PageNotFound = () => {
	return (
		<div className='wrapper'>
			<img src={notFound} className='not-found' />
		</div>
	)
}

export default PageNotFound