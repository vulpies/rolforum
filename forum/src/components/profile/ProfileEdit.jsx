import React from 'react'
import { useEffect, useState } from 'react'
import { BsPencil } from 'react-icons/bs'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { commonFetch, commonPostReq } from '../../helpers/commonFetch'
import CommonInputs from '../../helpers/CommonInputs'
import Breadcrumbs from '../breadcrumbs'
import CustomSelect from '../CustomSelect'
import { updateUserInfo } from '../../store/usersSlice'
import Swal from 'sweetalert2'
import { useTranslation } from "react-i18next";

const ProfileEdit = () => {
	const { t } = useTranslation();
	const [user] = useSelector((state) => state.usersReducer.user)
	const [name, setName] = useState(user?.user_name)
	const [email, setEmail] = useState(user?.user_name)
	const [avatar, setAvatar] = useState(user?.user_avatar)
	const [timeZone, setTimeZone] = useState([])
	const [getUserTime, setGetUserTime] = useState({})
	const [language, setLanguage] = useState(user?.language)


	const dispatch = useDispatch()

	const time = {
		"value": user?.timezone,
		"label": user?.timezone
	}

	const languages = [
		{"value": "en", "label": "English"},
		{"value": "ru", "label": "Russian"}
	]

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
			timeZone: getUserTime.value || time.value,
			language: language.value
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
			text: t("components.profileEdit.information_saved"),
			icon: 'success'
		})
		navigate(`/profile/${user?.user_id}`)
	}

	return (
		<div className='wrapper'>
			<div className='sepi-bread-header extra'>
				<Breadcrumbs name={t("components.profileEdit.edit")} link={`/profile/${user?.user_id}`} extraName={t("components.profileEdit.profile")} />
			</div>

			{user ?
				<form className='profile-input__wrapper'>
					<CommonInputs
						type='text'
						inputName={t("components.profileEdit.username")}
						className='profile-input__input'
						value={name}
						disabled
						onChange={(e) => setName(e.target.value)}
						placeholder={user?.user_name}
					/>

					<CommonInputs
						type='email'
						inputName={t("components.profileEdit.email")}
						className='profile-input__input'
						value={email}
						disabled
						onChange={(e) => setEmail(e.target.value)}
						placeholder={user?.user_name}
					/>

					<div className='profile-input__pass'>
						<p>{t("components.profileEdit.change_password")}</p> <button className='btns profile-edit' onClick={() => navigate(`/profile/${user.user_id}/edit/pass`)}>
							<BsPencil />
						</button>
					</div>

					<CommonInputs
						type='text'
						inputName={t("components.profileEdit.avatar")}
						className='profile-input__input'
						value={avatar ?? ''}
						onChange={(e) => setAvatar(e.target.value)}
						placeholder={t("components.profileEdit.enter_image_link")}
					/>

					<CustomSelect
						styleDiv='profile-input__input'
						label={t("components.profileEdit.timezone")}
						onChange={(e) => setGetUserTime(e)}
						options={timeZone && timeZone.map((item) => ({ "value": item, "label": item }))}
						closeMenuOnSelect={true}
						isMulti={false}
						defaultValue={time}
						placeholder={t("components.profileEdit.choose_timezone")}
					/>

					<CustomSelect
						styleDiv='profile-input__input'
						label={t("components.profileEdit.language")}
						onChange={(e) => setLanguage(e)}
						options={[{"value": "en", "label": "English"}, {"value": "ru", "label": "Russian"}]}
						closeMenuOnSelect={true}
						isMulti={false}
						defaultValue={languages.filter( (item) => { return item.value === language })[0]}
						placeholder={t("components.profileEdit.choose_language")}
					/>

					<input type="submit" value="Сохранить" className='btns btns-create btns-send' onClick={handleSubmit} />
				</form>
				: t("components.profileEdit.loading")
			}

		</div>
	)
}

export default ProfileEdit