import React from 'react'
import { useEffect, useState } from 'react'
import { BsPencilSquare } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { commonFetch } from '../../helpers/commonFetch'
import Breadcrumbs from '../breadcrumbs'
import CustomSelect from '../CustomSelect'
import ProfileInputs from './Profile_Inputs'

const ProfileEdit = () => {
	const [user] = useSelector((state) => state.usersReducer.user)
	console.log(user)
	const [name, setName] = useState(user?.user_name)
	const [email, setEmail] = useState(user?.user_name)
	const [avatar, setAvatar] = useState(user?.user_avatar)
	const [timeZone, setTimeZone] = useState([])
	const [getUserTime, setGetUserTime] = useState({})

	const navigate = useNavigate()

	useEffect(() => {
		commonFetch('https://api.rolecrossways.com/v1/timezones', setTimeZone)
	}, [])

	function handleSubmit(e) {
		e.preventDefault()

		const abc = {
			id: user.user_id,
			name,
			email,
			avatar,
			time: getUserTime.value
		}
		console.log(abc)
		//The endpoint to send the form to is: "/v1/profile/edit". It should be a post request
	}

	return (
		<div className='wrapper'>
			<div className='sepi-bread-header extra'>
				<Breadcrumbs name='Редактировать' link={`/profile/${user?.user_id}`} extraName="Профиль" />
			</div>
			<hr />

			{user ?
				<form className='profile-input__wrapper'>
					<ProfileInputs
						type='text'
						inputName='Имя пользователя:'
						className='profile-input__input'
						value={name}
						disabled
						onChange={(e) => setName(e.target.value)}
						placeholder={user?.user_name}
					/>

					<ProfileInputs
						type='email'
						inputName='E-mail:'
						className='profile-input__input'
						value={email}
						disabled
						onChange={(e) => setEmail(e.target.value)}
						placeholder={user?.user_name}
					/>

					<div className='profile-input__pass'>
						<p>Изменить пароль:</p> <button className='btns profile-edit' onClick={() => navigate(`/profile/${user.user_id}/edit/pass`)}>
							<BsPencilSquare />
						</button>

					</div>

					<ProfileInputs
						type='text'
						inputName='Аватар:'
						className='profile-input__input'
						value={avatar}
						onChange={(e) => setAvatar(e.target.value)}
						placeholder='Вставьте ссылку на изображение'
					/>

					<CustomSelect
						styleDiv='profile-input__input'
						label='Часовой пояс:'
						onChange={(e) => setGetUserTime(e)}
						// styleSelect='profile-input__input'
						options={timeZone && timeZone.map((item) => ({ "value": item, "label": item }))}
						closeMenuOnSelect={true}
						isMulti={false}
						placeholder="Выберите пояс"
					/>

					<input type="submit" value="Сохранить" className='btns btns-create btns-send' onClick={handleSubmit} />
				</form>
				: "Загрузка данных..."
			}

		</div>
	)
}

export default ProfileEdit