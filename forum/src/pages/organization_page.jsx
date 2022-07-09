import React from 'react'
import Breadcrumbs from '../components/breadcrumbs'
import { useTranslation } from "react-i18next";

const OrgPage = () => {
	const { t } = useTranslation();
	return (
		<div className='wrapper'>

			<div className='epi-links single-link'>
				<Breadcrumbs name={t("pages.organization_page.organization")} />
			</div>

			<div className='org-wrapper'>
				<div className='org-common'>
					<a href='/org/list_of_roles'>{t("pages.organization_page.character_list")}</a>
				</div>

				<div className='org-common'>
					<a href='/org/list_of_users'>Список пользователей</a>
				</div>
			</div>

		</div>
	)
}

export default OrgPage