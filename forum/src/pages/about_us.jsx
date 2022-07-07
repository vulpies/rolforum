import React from 'react'
import { useTranslation } from "react-i18next";

const AboutUs = () => {
	const { t } = useTranslation();
	return (
		<div className='wrapper'>
			<span dangerouslySetInnerHTML={{__html: t("pages.about_us.text")}} />
			</div>
	)
}

export default AboutUs