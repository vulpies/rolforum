import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Breadcrumbs from '../components/breadcrumbs'
import { commonFetch } from '../helpers/commonFetch'
import ModerCards from '../components/ModerCards'

const ModerPage = () => {
	const { t } = useTranslation();
	const [info, setInfo] = useState()

	useEffect(() => {
		commonFetch('https://api.postscriptum.games/v1/moderate/character-application-list', setInfo)

	}, [setInfo])

	console.log(info)

	const data = info ? info : ''


	return (
		<div className='wrapper'>
			<div className='epi-links single-link'>
				<Breadcrumbs name={t("components.navlinks.moder")} />
			</div>

			<div className='cards-wrapper'>
				<ModerCards
					className='cards-common'
					link='/char_app'
					name={t("pages.moder_page.applications")}
					length={data?.length}
				/>

				<ModerCards
					className='cards-common'
					link='/char_app'
					name={t("pages.moder_page.applications")}
					length={data?.length}
				/>

				<ModerCards
					className='cards-common'
					link='/char_app'
					name={t("pages.moder_page.applications")}
					length={data?.length}
				/>
			</div>

		</div>
	)
}

export default ModerPage