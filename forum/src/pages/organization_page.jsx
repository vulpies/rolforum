import React from 'react'
import Breadcrumbs from '../components/breadcrumbs'
import { useTranslation } from "react-i18next";

const OrgPage = () => {
	const { t } = useTranslation();
	return (
		<div className='wrapper'>

			<div className='epi-links' style={{ marginTop: '-9px' }}>
				<a href="/episodes/template">{t("pages.organization_page.new_episode")}</a>
				<Breadcrumbs name={t("pages.organization_page.organization")} />
			</div >

			<div className='org-wrapper'>
				<div className='org-common'>
					<a href='/org/list_of_roles'>{t("pages.organization_page.character_list")}</a>
				</div>
			</div>

		</div >
	)
}

export default OrgPage