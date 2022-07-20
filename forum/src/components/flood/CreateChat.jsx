import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { commonFetch } from '../../helpers/commonFetch'
import Breadcrumbs from '../breadcrumbs'
import CustomSelect from '../CustomSelect'

const CreateChat = () => {
	const { t } = useTranslation();
	const [title, setTitle] = useState()
	const [usersList, setUsersList] = useState()
	const [value, setRadioValue] = useState('common');
	// const [participants, setParticipants] = useState([])

	useEffect(() => {
		commonFetch(`https://api.postscriptum.games/v1/user-list`, setUsersList)
	}, [setUsersList])

	// const getParticipants = useCallback((usersList) => {
	// 	setParticipants(usersList.map(item => ({ "value": item.value, "label": item.label })))
	// }, [])

	// console.log(participants)


	return (
		<div className='wrapper'>

			<div className='sepi-bread-header extra'>
				<Breadcrumbs name="Создать новый чат" link='/chats/1' extraName="Флуд" />
			</div>


			<form className='create-chat-wrapper create-new-epi'>
				<label className='create-new-epi__title'>Название чата:
					<input type="text"
						className='create-new-epi__input'
						placeholder="Введите название"
						value={title}
						onChange={(e) => setTitle(e.target.value)} />
				</label>

				<CustomSelect
					styleDiv='creacte-chat__form create-new-epi__form'
					label="Участники:"
					// onChange={getParticipants}
					styleSelect='create-new-epi__select'
					options={usersList?.map(item => ({ "value": item.id, "label": item.user_name }))}
					isMulti={true}
					closeMenuOnSelect={false}
					placeholder="Выберите пользователей"
				/>

				<div className='create-chat-radio'>

					<div className='create-chat__every'>
						<input
							type='radio'
							id='common'
							name='chats'
							value='common'
							checked={value === 'common' ? true : false}
							onChange={(e) => setRadioValue(e.target.value)}
						/>
						<label htmlFor='common'>Общий</label>
					</div>

					<div className='create-chat__every'>
						<input
							type='radio'
							id='private'
							name='chats'
							value='private'
							checked={value === 'private' ? true : false}
							onChange={(e) => setRadioValue(e.target.value)}
						/>

						<label htmlFor='private'>Личный</label>
					</div>

				</div>


				<input type="submit" value={t("components.epiNewCreate.create")} className='btns btns-create' onClick={() => { }} />
			</form>
		</div>
	)
}

export default CreateChat