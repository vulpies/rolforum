import React from 'react'
import { useTranslation } from 'react-i18next';
import Breadcrumbs from '../components/breadcrumbs'

const AdminPage = () => {
	const { t } = useTranslation();

	return (
		<div className='wrapper'>
			<div className='epi-links single-link'>
				<Breadcrumbs name={t("components.navlinks.admin")} />
			</div>


			Admin_page</div>
	)
}

export default AdminPage