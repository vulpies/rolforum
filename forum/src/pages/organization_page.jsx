import React from 'react'
import Breadcrumbs from '../components/breadcrumbs'

const OrgPage = () => {
	return (
		<div className='wrapper'>

			<div className='epi-links' style={{ marginTop: '-9px' }}>
				<a href="/episodes/template">Новая тема</a>
				<Breadcrumbs name="Орг. темы" />
			</div >

			<div className='org-wrapper'>
				<div className='org-common'>
					<a href='/org/list_of_roles'>Список ролей</a>
				</div>
			</div>

		</div >
	)
}

export default OrgPage