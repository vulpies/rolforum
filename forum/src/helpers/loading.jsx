import React from 'react'
import { useTranslation } from 'react-i18next';

const Loading = () => {
	const { t } = useTranslation();

	return (
		<p style={{ textAlign: 'center', marginTop: 20 }}>{t("components.loading_info.loading")}</p>
	)
}

export default Loading