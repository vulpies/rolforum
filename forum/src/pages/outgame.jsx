import React from 'react'
import { useTranslation } from 'react-i18next';
import Breadcrumbs from '../components/breadcrumbs'

const Outgame = () => {
	const { t } = useTranslation();

	return (
		<div className="wrapper">
			<div className='epi-links single-link'>
				<Breadcrumbs name={t("components.navlinks.offgame")} />
			</div>
		</div>
	)
}

export default Outgame