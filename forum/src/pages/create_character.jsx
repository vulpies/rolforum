import React from 'react'
import Breadcrumbs from '../components/breadcrumbs'
import Form from '../components/create_character/Form'
import {useTranslation} from "react-i18next";

const CreateCharacter = () => {
	const { t } = useTranslation();
	return (
		<div className='wrapper'>
			<div className='epi-links single-link'>
				<Breadcrumbs name={t("pages.create_character.create_character")} />
			</div>

			<Form />
		</div>
	)
}

export default CreateCharacter