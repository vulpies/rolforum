import React, { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Breadcrumbs from '../breadcrumbs'
import CustomSelect from '../CustomSelect'
import { commonFetch, sendEpiFetch } from '../../helpers/commonFetch'

const EpiNewCreate = () => {
	const userInfo = useSelector((state) => state.usersReducer.user[0])
	const navigate = useNavigate()

	const [title, setTitle] = useState('')
	const [desc, setDesc] = useState('')
	const [image, setImage] = useState('')
	const [type, setType] = useState()

	const fandom = {
		"value": userInfo?.current_character.fandom_id,
		"label": userInfo?.current_character.fandom_name
	}
	const [check, setCheck] = useState(true);
	const [allUsersList, setAllUsersList] = useState()

	const [cross, setCross] = useState()
	const [fandomChars, setFandomChars] = useState()

	const [multiListValue, setMultiListValue] = useState([])


	useEffect(() => {
		if (type && type.value === 'fandom') {

			commonFetch(`https://api.rolecrossways.com/v1/character-list-short-view?fandom_id=${fandom.value}`, setFandomChars)

		} else if (type && type.value === 'crossover') {
			commonFetch('https://api.rolecrossways.com/v1/fandom-list-short-view', setCross)

			commonFetch(`https://api.rolecrossways.com/v1/character-list-short-view?fandom_id=${multiListValue.map(v => (v.value)).join('- ')}`, setFandomChars)

		} else if (type && type.value === 'au') {
			commonFetch('https://api.rolecrossways.com/v1/character-list-short-view', setAllUsersList)

		} else {
			return ''
		}
	}, [setCross, type, fandom.value, multiListValue])

	const getMultiListValue = useCallback((cross) => {
		setMultiListValue(cross.map(item => ({ "value": item.value, "label": item.label })))
	}, [])

	const options = [
		{ value: 'fandom', label: 'По фандому' },
		{ value: 'crossover', label: 'Кроссовер' },
		{ value: 'au', label: 'AU' },
	]

	const handleSubmit = (e) => {
		e.preventDefault()

		if (type && type.value === 'fandom') {
			const fandomList = {
				type: type.value,
				title,
				image,
				fandom_id: [fandom.value],
				character_id: multiListValue.map(c => ({ value: c.value, label: c.label })),
				desc,
				forGuests: check
			}

			sendEpiFetch('https://api.rolecrossways.com/v1/episode-create', fandomList)
				.then(data => navigate(`/episodes/${data.episode_id}`))

		} else if (type && type.value === 'crossover') {

			const crossList = {
				type: type.value,
				title,
				image,
				fandom_id: [],
				character_id: multiListValue.map(c => ({ value: c.value, label: c.label })),
				desc,
				forGuests: check
			}

			sendEpiFetch('https://api.rolecrossways.com/v1/episode-create', crossList)
				.then(data => navigate(`/episodes/${data.episode_id}`))
			console.log(crossList)


		} else if (type && type.value === 'au') {
			const auList = {
				type: type.value,
				title,
				image,
				fandom_id: [1],
				character_id: multiListValue.map(c => ({ value: c.value, label: c.label })),
				desc,
				forGuests: check
			}

			sendEpiFetch('https://api.rolecrossways.com/v1/episode-create', auList)
				.then(data => navigate(`/episodes/${data.episode_id}`))

			console.log(auList)
		} else {
			return ''
		}
	}


	return (
		<div className='wrapper'>
			<div className='sepi-bread-header extra'>
				<Breadcrumbs name='Новая тема' link='/episodes' extraName="Эпизоды" />
			</div>
			<hr />

			<form className='create-new-epi'>
				<label className='create-new-epi__title'>Название эпизода: <input type="text" className='create-new-epi__input' placeholder='Эпизод...' value={title} onChange={(e) => setTitle(e.target.value)} /></label>

				<CustomSelect
					styleDiv='create-new-epi__form'
					label='Формат игры:'
					onChange={setType}
					styleSelect='create-new-epi__select'
					options={options}
					closeMenuOnSelect={true}
					placeholder="Выберите тип игры"
				/>

				{type && type.value === 'fandom' ?
					<>
						<CustomSelect
							styleDiv='create-new-epi__form'
							label='Фандом'
							styleSelect='create-new-epi__select'
							options={fandom}
							isDisabled={true}
							defaultValue={fandom}
						/>
						<CustomSelect
							closeMenuOnSelect={false}
							styleDiv='create-new-epi__form'
							label='Персонажи:'
							onChange={getMultiListValue}
							styleSelect='create-new-epi__select'
							options={fandomChars && fandomChars.map(item => ({ "value": item.id, "label": item.name }))}
							isMulti={true}
							placeholder="Выберите игроков"
						/>

					</> : ''}

				{type && type.value === 'crossover' ?
					<>
						<CustomSelect
							styleDiv='create-new-epi__form'
							label='Кроссовер по:'
							onChange={getMultiListValue}
							styleSelect='create-new-epi__select'
							options={cross && cross.map(item => ({ "value": item.id, "label": item.name }))}
							closeMenuOnSelect={false}
							isMulti={true}
							placeholder="Выберите фандомы"
						/>
						<CustomSelect
							styleDiv='create-new-epi__form'
							label='Персонажи:'
							onChange={getMultiListValue}
							styleSelect='create-new-epi__select'
							options={fandomChars && fandomChars.map(item => ({ "value": item.id, "label": item.name }))}
							closeMenuOnSelect={false}
							isMulti={true}
							placeholder="Выберите игроков"
						/>
					</>
					: ''}

				{type && type.value === 'au' ?
					<CustomSelect
						styleDiv='create-new-epi__form'
						label='Персонажи:'
						onChange={getMultiListValue}
						styleSelect='create-new-epi__select'
						options={allUsersList && allUsersList.map(item => ({ "value": item.id, "label": item.name }))}
						closeMenuOnSelect={false}
						isMulti={true}
						placeholder="Выберите игроков"
					/> : ''}

				<div className='create-new-epi__img'>
					<label className='create-new-epi__title'>Картинка:</label>
					<input className='create-new-epi__input' placeholder='Вставьте ссылку...' value={image} onChange={(e) => setImage(e.target.value)} />
				</div>

				<div className='create-new-epi__desc'>
					<label className='create-new-epi__title'>Описание:</label>
					<textarea className='create-new-epi__text' placeholder='Описание эпизода...' value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
				</div>

				<div className='create-new-epi__radio'>
					<div className="switch-cover">
						<div className="switch r" id="switch-1">
							<input type="checkbox" className="checkbox" value={check} onChange={() => setCheck(!check)} />
							<div className="knobs"></div>
						</div>
					</div>
					<p>виден для гостей</p>
				</div>

				<input type="submit" value="Submit" className='btns btns-create' onClick={handleSubmit} />
			</form >
		</div >
	)
}

export default EpiNewCreate