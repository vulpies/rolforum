import React from 'react'
import Breadcrumbs from '../components/breadcrumbs'
import Flood from '../components/flood/Flood'
import { useTranslation } from "react-i18next";

const Chats = () => {
	const { t } = useTranslation();
	return (
		<div className='wrapper'>
			<div className='epi-links single-link'>
				<Breadcrumbs name={t("pages.chats_page.chats")} />
			</div>
			<Flood />
		</div>
	)
}

export default Chats