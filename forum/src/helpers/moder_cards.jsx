import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'

const ModerCards = ({ className, name, length, link }) => {
	const { t } = useTranslation();

	return (
		<>
			<div className={className}>
				<Link to={link}>{name}</Link>
				{length === 0 ? <p className='moder-grey'>{t("pages.moder_page.nothing_new")}</p> : <p>{t("pages.moder_page.new_themes")} <span>{length}</span></p>}
			</div>
		</>
	)
}

export default ModerCards