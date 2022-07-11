import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../../components/breadcrumbs'
import { commonFetch } from '../../helpers/commonFetch'
import { useTranslation } from "react-i18next";
import stranger from '../../images/stranger.jpg'
import Loading from '../../helpers/loading';

const UsersList = () => {
	const { t } = useTranslation();
	const [users, setUsers] = useState()

	useEffect(() => {
		commonFetch(`https://api.postscriptum.games/v1/user-list`, setUsers)
	}, [setUsers])

	console.log(users, 'users')

	const usersList = users ?
		<div className='users-common'>
			{users.map(item => (
				<div className='users-wrapper' key={item.id}>
					<p className='user-title'><a href={`/profile/${item.id}`}>{item.user_name}</a></p>

					<a href={`/profile/${item.id}`}><img src={item.avatar ? item.avatar : stranger} alt='' className='user-avatar' /></a>

					<p className='user-statistics'><span>{t("pages.users_list.registered")}</span> {item.registered_at}</p>
					<p className='user-statistics'><span>{t("pages.users_list.last_visit")}</span> {item.last_activity_at ? item.last_activity_at : t("pages.users_list.no_activity")}</p>
				</div>
			))}
		</div> : <Loading />

	return (
		<div className='wrapper'>

			<div className='sepi-bread-header extra'>
				<Breadcrumbs name={t("pages.users_list.user_list")} link='/org' extraName={t("pages.roles_list.organization")} />
			</div>

			{usersList}

		</div>
	)
}

export default UsersList