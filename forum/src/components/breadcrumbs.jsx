import React from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import {useTranslation} from "react-i18next";


const Breadcrumbs = ({ name, link, extraName }) => {
	const { t } = useTranslation();
	return (
		<>
			{name && link && extraName ?
				<Breadcrumb >
					<Breadcrumb.Item href="/">{t("components.breadcrumbs.index")}</Breadcrumb.Item>
					{'>'}
					<Breadcrumb.Item href={`${link}`}>
						{extraName}
					</Breadcrumb.Item>
					{'>'}
					<Breadcrumb.Item active>{name}</Breadcrumb.Item>
				</Breadcrumb>
				:
				<Breadcrumb >
					<Breadcrumb.Item href="/">{t("components.breadcrumbs.index")}</Breadcrumb.Item>
					{'>'}
					<Breadcrumb.Item active>{name}</Breadcrumb.Item>
				</Breadcrumb>
			} </>)
}

export default Breadcrumbs