import React from 'react'
import Breadcrumbs from '../components/breadcrumbs'
import { useTranslation } from "react-i18next";

const OrgPage = () => {
	const { t } = useTranslation();

	const orgs = [
		{
			name: t("pages.organization_page.news"),
			link: '/org/news'
		},
		// {
		// 	name: t("pages.organization_page.character_list"),
		// 	link: '/org/list_of_roles'
		// },
		// {
		// 	name: t("pages.organization_page.user_list"),
		// 	link: '/org/list_of_users'
		// },
		// {
		// 	name: t("pages.organization_page.actions"),
		// 	link: '/org/actions'
		// },
		// {
		// 	name: t("pages.organization_page.looking_for"),
		// 	link: '/org/looking_for'
		// },
		{
			name: 'Задать вопрос',
			link: '/org/questions'
		},
	]

	return (
		<div className='wrapper'>

			<div className='epi-links single-link'>
				<Breadcrumbs name={t("pages.organization_page.organization")} />
			</div>

			<div className='org-wrapper'>
				{orgs.map((item, i) => {
					return <div className='org-common' key={i}>
						<a href={item.link}>{item.name}</a>
					</div>
				})}
			</div>
		</div>
	)
}

export default OrgPage