import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { commonFetch, commonPostReq } from '../../helpers/commonFetch'
import Breadcrumbs from '../breadcrumbs'
import CustomSelect from '../CustomSelect'
import { SwallSuccess } from '../../helpers/swall_notifications'

const CreateChat = () => {
	const { t } = useTranslation();
	const [title, setTitle] = useState()
	const [usersList, setUsersList] = useState()
	const [value, setRadioValue] = useState('public');
	const [participants, setParticipants] = useState([])
	const navigate = useNavigate()

	useEffect(() => {
		commonFetch(`https://api.postscriptum.games/v1/user-list`, setUsersList)
	}, [])

	const getParticipants = useCallback((usersList) => {
		setParticipants(usersList.map(item => ({ "value": item.value, "label": item.label })))
	}, [])

	const chatInfo = {
		name: title,
		character_id: participants.map(item => (item.value)),
		is_public: value
	}

	const createNewChat = () => {
		// commonPostReq(`https://api.postscriptum.games/v1/chat-room-create`, chatInfo)
		// SwallSuccess('Новый чат был успешно создан! Вы можете найти его в списке чатов.')
		// navigate(`/chats/1`)
		console.log(chatInfo)
	}


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
					onChange={getParticipants}
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
							value='public'
							checked={value === 'public' ? true : false}
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

				<input
					type="submit"
					value={t("components.epiNewCreate.create")}
					className='btns btns-create'
					onClick={createNewChat} />
			</form>
		</div>
	)
}

export default CreateChat