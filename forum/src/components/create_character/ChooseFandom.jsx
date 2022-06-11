import React from 'react'
import { useEffect, useState } from 'react'
import { commonFetch } from '../../helpers/commonFetch'
import CommonInputs from '../../helpers/CommonInputs'
import CustomSelect from '../CustomSelect'

const ChooseFandom = ({ formData, setFormData }) => {
	const [type, setType] = useState('')
	const [fandomList, setFandomList] = useState([])
	const [roles, setRoles] = useState()

	roles?.sort((prev, next) => {
		if (prev.name.toLowerCase() < next.name.toLowerCase()) return -1
		if (prev.name.toLowerCase() > next.name.toLowerCase()) return 1
	})

	const options = [
		{ value: 'blank', label: 'Создать новый фандом' },
		{ value: 'fandom', label: 'Выбрать из имеющихся' }
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
				label='Выберите нужное:'
				onChange={setType}
				styleSelect='create-new-epi__select'
				options={options}
				closeMenuOnSelect={true}
				placeholder="Выберите тип фандома"
			/>

			{type && type.value === "blank" ?
				<div className='create-new-epi__form'>
					<CommonInputs
						type='text'
						inputName='Название фандома:'
						className='profile-input__input'
						value={formData.fandom_name}
						onChange={(event) =>
							setFormData({ ...formData, fandom_name: event.target.value, existing_fandom: false })
						}
						placeholder={'На английском!'}
					/>
				</div> : ''}

			{type && type.value === "fandom" ?
				<div className='create-new-epi__form'>

					<CustomSelect
						styleDiv='create-new-epi__form'
						label='Фандом:'
						value={formData.fandom_name}
						onChange={(event) =>
							setFormData({ ...formData, fandom_id: event.value, fandom_name: event.label, existing_fandom: true })
						}
						styleSelect='create-new-epi__select'
						options={options2}
						closeMenuOnSelect={true}
						placeholder="Выберите фандом"
					/>

					{roles && roles.length !== 0 ?
						<div className='create-new-epi__form'>
							<h4>Список занятых ролей:</h4>
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