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

	// console.log(roles, '3333')
	// console.log(formData.existing_fandom, 'formData.existing_fandom')

	const oneFandom = [...fandomList]

	const options2 = oneFandom.map(item => ({ "value": item.id, "label": item.name }))

	useEffect(() => {
		if (type && type.value === 'fandom') {
			commonFetch('https://api.rolecrossways.com/v1/fandom-list-short-view', setFandomList)

			commonFetch(`https://api.rolecrossways.com/v1/character-list-short-view?fandom_id=${formData.existing_fandom || null}`, setRoles)
		}

	}, [type, setFandomList, formData.existing_fandom])

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
							setFormData({ ...formData, fandom_name: event.target.value })
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
							setFormData({ ...formData, existing_fandom: event.value, fandom_name: event.label })
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