import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Breadcrumbs from '../breadcrumbs'
import CustomSelect from '../CustomSelect'
import { commonFetch, commonPostReq } from '../../helpers/commonFetch'
import { useTranslation } from "react-i18next";
import Loading from '../../helpers/loading'

const EpiNewCreate = () => {
	const { t } = useTranslation();
	const userInfo = useSelector((state) => state.usersReducer.user[0])
	const navigate = useNavigate()

	const [title, setTitle] = useState('')
	const [desc, setDesc] = useState('')
	const [image, setImage] = useState('')
	const [type, setType] = useState()

	const fandom = {
		"value": userInfo?.current_character?.fandom_id,
		"label": userInfo?.current_character?.fandom_name
	}

	const [check, setCheck] = useState(true);
	const [allUsersList, setAllUsersList] = useState()

	const [cross, setCross] = useState()
	const [fandomChars, setFandomChars] = useState()

	const [multiListValue, setMultiListValue] = useState([])
	const [newListOfChars, setNewList] = useState()


	useEffect(() => {
		if (type && type.value === 'fandom') {
			commonFetch(`https://api.postscriptum.games/v1/character-list-short-view?fandom_id=${fandom.value}`, setFandomChars)

		} else if (type && type.value === 'crossover') {
			commonFetch('https://api.postscriptum.games/v1/fandom-list-short-view', setCross)

		} else if (type && type.value === 'au') {
			commonFetch('https://api.postscriptum.games/v1/character-list-short-view', setAllUsersList)
		} else {

		}
	}, [type, fandom.value])


	const options = [
		{ value: 'fandom', label: t("components.epiNewCreate.label_fandom") },
		{ value: 'crossover', label: t("components.epiNewCreate.label_crossover") },
		{ value: 'au', label: t("components.epiNewCreate.label_au") },
	]

	const getMultiListValue = (cross) => {
		setMultiListValue(cross)
		commonFetch(`https://api.postscriptum.games/v1/character-list-short-view?fandom_id=${cross.map(v => (v.value)).join('- ')}`, setFandomChars)
	}

	const getNewId = (param) => {
		navigate(`/episodes/${param.episode_id}`)
	}


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
			console.log(fandomList, '8888')

			commonPostReq('https://api.postscriptum.games/v1/episode-create', fandomList, getNewId)
		} else if (type && type.value === 'crossover') {

			const crossList = {
				type: type.value,
				title,
				image,
				fandom_id: multiListValue.map(c => c.value),
				character_id: newListOfChars.map(c => ({ value: c.value, label: c.label })),
				desc,
				forGuests: check
			}

			commonPostReq('https://api.postscriptum.games/v1/episode-create', crossList, getNewId)
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

			commonPostReq('https://api.postscriptum.games/v1/episode-create', auList, getNewId)
		} else {
			return ''
		}
	}


	return (
		<div className='wrapper'>
			<div className='sepi-bread-header extra'>
				<Breadcrumbs name={t("components.epiNewCreate.new_episode")} link='/episodes' extraName={t("components.epiNewCreate.episodes")} />
			</div>

			{userInfo?.current_character ?
				<form className='create-new-epi' id='epiCreateForm'>
					<label className='create-new-epi__title'>{t("components.epiNewCreate.episode_name")}
						<input type="text" className='create-new-epi__input' placeholder={t("components.epiNewCreate.episode")} value={title} onChange={(e) => setTitle(e.target.value)} />
					</label>

					<CustomSelect
						styleDiv='create-new-epi__form'
						label={t("components.epiNewCreate.game_format")}
						onChange={setType}
						styleSelect='create-new-epi__select'
						options={options}
						closeMenuOnSelect={true}
						placeholder={t("components.epiNewCreate.choose_game_type")}
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
								label={t("components.epiNewCreate.characters")}
								onChange={getMultiListValue}
								styleSelect='create-new-epi__select'
								options={fandomChars && fandomChars.map(item => ({ "value": item.id, "label": item.name }))}
								isMulti={true}
								placeholder={t("components.epiNewCreate.choose_characters")}
							/>

						</> : ''}

					{type && type.value === 'crossover' ?
						<>
							<CustomSelect
								styleDiv='create-new-epi__form'
								label={t("components.epiNewCreate.crossover")}
								onChange={getMultiListValue}
								styleSelect='create-new-epi__select'
								options={cross && cross.map(item => ({ "value": item.id, "label": item.name }))}
								closeMenuOnSelect={false}
								isMulti={true}
								placeholder={t("components.epiNewCreate.choose_fandoms")}
							/>
							<CustomSelect
								styleDiv='create-new-epi__form'
								label={t("components.epiNewCreate.characters")}
								onChange={setNewList}
								styleSelect='create-new-epi__select'
								options={fandomChars && fandomChars.map(item => ({ "value": item.id, "label": item.name }))}
								closeMenuOnSelect={false}
								name='crossCharacters'
								isMulti={true}
								placeholder={t("components.epiNewCreate.choose_characters")}
							/>
						</>
						: ''}

					{type && type.value === 'au' ?
						<CustomSelect
							styleDiv='create-new-epi__form'
							label={t("components.epiNewCreate.characters")}
							onChange={getMultiListValue}
							styleSelect='create-new-epi__select'
							options={allUsersList && allUsersList.map(item => ({ "value": item.id, "label": item.name }))}
							closeMenuOnSelect={false}
							isMulti={true}
							placeholder={t("components.epiNewCreate.choose_characters")}
						/> : ''}

					<div className='create-new-epi__img'>
						<label className='create-new-epi__title'>{t("components.epiNewCreate.image")}</label>
						<input className='create-new-epi__input' placeholder={t("components.epiNewCreate.enter_link")} value={image} onChange={(e) => setImage(e.target.value)} />
					</div>

					<div className='create-new-epi__desc'>
						<label className='create-new-epi__title'>{t("components.epiNewCreate.summary")}</label>
						<textarea className='create-new-epi__text' placeholder={t("components.epiNewCreate.episode_summary")} value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
					</div>

					<div className='create-new-epi__radio'>
						<div className="switch-cover">
							<div className="switch r" id="switch-1">
								<input type="checkbox" className="checkbox" value={check} onChange={() => setCheck(!check)} />
								<div className="knobs"></div>
							</div>
						</div>
						<p>{t("components.epiNewCreate.guest_visible")}</p>
					</div>

					<input
						type="submit"
						value={t("components.epiNewCreate.create")}
						className='btns btns-create'
						onClick={handleSubmit} />
				</form> : <Loading />}

		</div >
	)
}

export default EpiNewCreate