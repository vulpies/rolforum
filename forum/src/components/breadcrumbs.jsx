import React from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb'


const Breadcrumbs = ({ name, link, extraName }) => {
	return (
		<>
			{name && link && extraName ?
				<Breadcrumb >
					<Breadcrumb.Item href="/">Главная</Breadcrumb.Item>
					{'>'}
					<Breadcrumb.Item href={`${link}`}>
						{extraName}
					</Breadcrumb.Item>
					{'>'}
					<Breadcrumb.Item active>{name}</Breadcrumb.Item>
				</Breadcrumb>
				:
				<Breadcrumb >
					<Breadcrumb.Item href="/">Главная</Breadcrumb.Item>
					{'>'}
					<Breadcrumb.Item active>{name}</Breadcrumb.Item>
				</Breadcrumb>
			} </>)
}

export default Breadcrumbs