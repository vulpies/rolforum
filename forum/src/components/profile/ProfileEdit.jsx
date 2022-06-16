import React from 'react'
import { useEffect, useState } from 'react'
import { BsPencilSquare } from 'react-icons/bs'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { commonFetch, commonPostReq } from '../../helpers/commonFetch'
import CommonInputs from '../../helpers/CommonInputs'
import Breadcrumbs from '../breadcrumbs'
import CustomSelect from '../CustomSelect'
import { updateUserInfo } from '../../store/usersSlice'
import Swal from 'sweetalert2'

const ProfileEdit = () => {
	const [user] = useSelector((state) => state.usersReducer.user)
	const [name, setName] = useState(user?.user_name)
	const [email, setEmail] = useState(user?.user_name)
	const [avatar, setAvatar] = useState(user?.user_avatar)
	const [timeZone, setTimeZone] = useState([])
	const [getUserTime, setGetUserTime] = useState({})


	const dispatch = useDispatch()

	const time = {
		"value": user?.timezone,
		"label": user?.timezone
	}

	// const defaultTime = {
	// 	"value": "Europe/Moscow",
	// 	"label": "Europe/Moscow"
	// }

	const navigate = useNavigate()

	useEffect(() => {
		commonFetch('https://api.postscriptum.games/v1/timezones', setTimeZone)
	}, [])


	function handleSubmit(e) {
		e.preventDefault()

		const updUserInfo = {
			id: user.user_id,
			name,
			email,
			avatar: avatar || '',
			timeZone: getUserTime.value || time.value
		}

		dispatch(updateUserInfo(updUserInfo))

		try {
			commonPostReq('https://api.postscriptum.games/v1/profile/edit', updUserInfo)
		} catch (err) {
			console.log(err)
		}
		console.log(updUserInfo)

		Swal.fire({
			width: 350,
			position: 'top',
			text: 'Информация успешно сохранена!',
			icon: 'success'
		})
		navigate(`/profile/${user?.user_id}`)
	}

	return (
		<div className='wrapper'>
			<div className='sepi-bread-header extra'>
				<Breadcrumbs name='Редактировать' link={`/profile/${user?.user_id}`} extraName="Профиль" />
			</div>

			{user ?
				<form className='profile-input__wrapper'>
					<CommonInputs
						type='text'
						inputName='Имя пользователя:'
						className='profile-input__input'
						value={name}
						disabled
						onChange={(e) => setName(e.target.value)}
						placeholder={user?.user_name}
					/>

					<CommonInputs
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

					<CommonInputs
						type='text'
						inputName='Аватар:'
						className='profile-input__input'
						value={avatar ?? ''}
						onChange={(e) => setAvatar(e.target.value)}
						placeholder='Вставьте ссылку на изображение'
					/>

					<CustomSelect
						styleDiv='profile-input__input'
						label='Часовой пояс:'
						onChange={(e) => setGetUserTime(e)}
						options={timeZone && timeZone.map((item) => ({ "value": item, "label": item }))}
						closeMenuOnSelect={true}
						isMulti={false}
						defaultValue={time}
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