import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../../components/breadcrumbs'
import { commonFetch } from '../../helpers/commonFetch'

const RolesList = () => {
	const [roles, setRoles] = useState()

	useEffect(() => {
		commonFetch(`https://api.postscriptum.games/v1/character-list`, setRoles)
	}, [setRoles])

	console.log(roles, 'roles')

	const listOfRoles = roles?.map(item => {
		return <div className='roles-wrapper' key={item.fandom.id}>
			<div className='roles-fandom'>{item.fandom.name}</div>
			<div className='roles-list'>
				<p>
					{item.characters.map(char =>
						<a href={`/my_chars/${char.character_id}`} key={char.character_id}>{char.character_name}</a>
					)}
				</p>
			</div>
		</div>
	})

	return (
		<div className='wrapper'>

			<div className='sepi-bread-header extra'>
				<Breadcrumbs name='Список ролей' link='/org' extraName="Орг. темы" />
			</div>


			{roles ? <div className='roles-common'>
				{listOfRoles}
			</div> :
				<p style={{ textAlign: 'center' }}>Загрузка данных...</p>}


		</div>
	)
}

export default RolesList