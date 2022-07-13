import React from 'react'
import Breadcrumbs from '../components/breadcrumbs'
import { useTranslation } from "react-i18next";

const GuestsPage = () => {
	const { t } = useTranslation();

	const guests = [
		{
			name: 'Правила',
			link: '/guestbook/rules'
		},
		{
			name: 'F.A.Q.',
			link: '/guestbook/faq'
		},
		{
			name: 'Задать вопрос',
			link: '/guestbook/questions'
		},
		{
			name: t("pages.guests_page.character_list"),
			link: '/guestbook/list_of_roles'
		},
		{
			name: t("pages.guests_page.user_list"),
			link: '/guestbook/list_of_users'
		},
	]


	return (
		<div className='wrapper'>

			<div className='epi-links single-link'>
				<Breadcrumbs name={t("pages.guests_page.guestbook")} />
			</div>

			<div className='org-wrapper'>
				{guests.map((item, i) => {
					return <div className='org-common' key={i}>
						<a href={item.link}>{item.name}</a>
					</div>
				})}
			</div>

		</div>
	)
}

export default GuestsPage