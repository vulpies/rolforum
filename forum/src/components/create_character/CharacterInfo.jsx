import React from 'react'
import CommonInputs from '../../helpers/CommonInputs'
import {useTranslation} from "react-i18next";

const CharacterInfo = ({ formData, setFormData }) => {
	const { t } = useTranslation();
	return (
		<>
			<div className='create-new-epi__title create-new-epi__character-desc'>
				<CommonInputs
					type='text'
					inputName={t("components.characterInfo.character_name")}
					className='create-new-epi__input'
					value={formData?.name}
					onChange={(e) => {
						setFormData({ ...formData, name: e.target.value });
					}}
					placeholder={t("components.characterInfo.en_english")}
				/>
				<p dangerouslySetInnerHTML={{__html: t("components.characterInfo.character_name_description")}} />
			</div>

			<div className='create-new-epi__title create-new-epi__character-desc'>
				<CommonInputs
					type='text'
					inputName={t("components.characterInfo.avatar")}
					className='create-new-epi__input'
					value={formData?.avatar}
					onChange={(e) => {
						setFormData({ ...formData, avatar: e.target.value });
					}}
					placeholder={t("components.characterInfo.avatar_placeholder")}
				/>
				<p dangerouslySetInnerHTML={{__html: t("components.characterInfo.avatar_description")}} />
			</div>

			<div className='create-new-epi__title create-new-epi__character-desc'>
				<label className='create-new-epi__title'>{t("components.characterInfo.description")}</label>
				<textarea type='text' className='create-new-epi__text'
					placeholder={t("components.characterInfo.description_placeholder")}
					value={formData?.description}
					onChange={(e) => {
						setFormData({ ...formData, description: e.target.value });
					}}>
				</textarea>
				<p dangerouslySetInnerHTML={{__html: t("components.characterInfo.description_description")}} />
			</div>

		</>
	)
}

export default CharacterInfo