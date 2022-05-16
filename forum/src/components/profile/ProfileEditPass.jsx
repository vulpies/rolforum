import React from 'react'
import { useSelector } from 'react-redux'
import Breadcrumbs from '../breadcrumbs'

const ProfileEditPass = () => {
	const [user] = useSelector((state) => state.usersReducer.user)
	return (
		<div className='wrapper'>
			<div className='sepi-bread-header extra'>
				<Breadcrumbs name='Пароль' link={`/profile/${user?.user_id}`} extraName="Профиль" />
			</div>
			<hr />
			ProfileEditPass</div>
	)
}

export default ProfileEditPass