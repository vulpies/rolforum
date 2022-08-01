import React from 'react'
import { useEffect, useState } from 'react'
import { commonFetch } from '../../helpers/commonFetch'
import CommonInputs from '../../helpers/CommonInputs'
import CustomSelect from '../CustomSelect'
import { useTranslation } from "react-i18next";

const ChooseFandom = ({ formData, setFormData }) => {
	const { t } = useTranslation();
	const [type, setType] = useState('')
	const [fandomList, setFandomList] = useState([])
	const [roles, setRoles] = useState()

	roles?.sort((prev, next) => {
		if (prev.name.toLowerCase() < next.name.toLowerCase()) return -1
		if (prev.name.toLowerCase() > next.name.toLowerCase()) return 1
	})

	const options = [
		{ value: 'blank', label: t("components.chooseFandom.new_fandom") },
		{ value: 'fandom', label: t("components.chooseFandom.existing_fandom") }
	]

	const oneFandom = [...fandomList]

	const options2 = oneFandom.map(item => ({ "value": item.id, "label": item.name }))

	useEffect(() => {
		if (type && type.value === 'fandom') {
			commonFetch('https://api.postscriptum.games/v1/fandom-list-short-view', setFandomList)

			commonFetch(`https://api.postscriptum.games/v1/character-list-short-view?fandom_id=${formData.fandom_id || null}`, setRoles)
		}

	}, [type, setFandomList, formData.fandom_id])


	return (
		<>
			<CustomSelect
				styleDiv='create-new-epi__form'
				label={t("components.chooseFandom.choose_one")}
				onChange={setType}
				styleSelect='create-new-epi__select'
				options={options}
				defaultValue={formData.fandom_name !== '' ? { value: '', label: formData.fandom_name } : ''}
				closeMenuOnSelect={true}
				placeholder={t("components.chooseFandom.choose_fandom_type")}
			/>

			{type && type.value === "blank" ?
				<div className='create-new-epi__form'>
					<CommonInputs
						type='text'
						inputName={t("components.chooseFandom.fandom_name")}
						className='profile-input__input'
						value={formData.fandom_name}
						onChange={(event) =>
							setFormData({ ...formData, fandom_name: event.target.value, existing_fandom: false })
						}
						placeholder={t("components.chooseFandom.en_english")}
					/>
				</div> : ''}

			{type && type.value === "fandom" ?
				<div className='create-new-epi__form'>

					<CustomSelect
						styleDiv='create-new-epi__form'
						label={t("components.chooseFandom.fandom")}
						value={formData.fandom_name}
						onChange={(event) =>
							setFormData({ ...formData, fandom_id: event.value, fandom_name: event.label, existing_fandom: true })
						}
						styleSelect='create-new-epi__select'
						options={options2}
						closeMenuOnSelect={true}
						placeholder={t("components.chooseFandom.choose_fandom")}
					/>

					{roles && roles.length !== 0 ?
						<div className='create-new-epi__form'>
							<h4>{t("components.chooseFandom.character_list")}</h4>
							<ul>
								{roles.map(role => <li key={role.id}>{role.name}</li>)}
							</ul>
						</div> : ''
					}
				</div> : ''}
		</>
	)
}

export default ChooseFandom