import React, { useEffect, useState } from 'react'
import { BsPencil } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { commonFetch, commonPostReq } from '../../helpers/commonFetch'
import CommonInputs from '../../helpers/CommonInputs'
import Breadcrumbs from '../breadcrumbs'
import CustomSelect from '../CustomSelect'
import { updateUserInfo } from '../../store/usersSlice'
import Swal from 'sweetalert2'
import { useTranslation } from "react-i18next";
import i18n from "../../services/i18n";
import Loading from '../../helpers/loading'

const ProfileEdit = () => {
	const { t } = useTranslation();
	const [prof, setProf] = useState()
	const [avatar, setAvatar] = useState(prof?.user_avatar)
	const [timeZone, setTimeZone] = useState([])
	const [getUserTime, setGetUserTime] = useState({})
	const [language, setLanguage] = useState(prof?.language)


	useEffect(() => {
		commonFetch('https://api.postscriptum.games/v1/profile/edit-data', setProf)
	}, [setProf])

	const dispatch = useDispatch()

	const time = {
		"value": prof?.timezone,
		"label": prof?.timezone
	}

	const languages = [
		{ "value": "en", "label": "English" },
		{ "value": "ru", "label": "Russian" }
	]

	const navigate = useNavigate()

	useEffect(() => {
		commonFetch('https://api.postscriptum.games/v1/timezones', setTimeZone)
	}, [])


	function handleSubmit(e) {
		e.preventDefault()

		const updUserInfo = {
			id: prof.user_id,
			avatar: avatar || '',
			timeZone: getUserTime?.value || time.value,
			language: language?.value || prof.language
		}

		dispatch(updateUserInfo(updUserInfo))

		try {
			commonPostReq('https://api.postscriptum.games/v1/profile/edit', updUserInfo)
			i18n.changeLanguage(updUserInfo.language)
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
		navigate(`/profile/${prof?.user_id}`)
	}

	return (
		<div className='wrapper wrapper-profile'>
			<div className='sepi-bread-header extra'>
				<Breadcrumbs name={t("components.profileEdit.edit")} link={`/profile/${prof?.user_id}`} extraName={t("components.profileEdit.profile")} />
			</div>

			{prof ? prof &&
				<form className='profile-input__wrapper'>
					<CommonInputs
						type='text'
						inputName={t("components.profileEdit.username")}
						className='profile-input__input'
						value={prof?.user_name}
						disabled
						placeholder={prof?.user_name}
					/>

					<CommonInputs
						type='email'
						inputName={t("components.profileEdit.email")}
						className='profile-input__input'
						value={prof?.email}
						disabled
						placeholder={prof?.user_name}
					/>

					<div className='profile-input__pass'>
						<p>{t("components.profileEdit.change_password")}</p> <button className='btns profile-edit' onClick={() => navigate(`/profile/${prof.user_id}/edit/pass`)}>
							<BsPencil />
						</button>
					</div>

					<CommonInputs
						type='text'
						inputName={t("components.profileEdit.avatar")}
						className='profile-input__input'
						defaultValue={prof?.user_avatar}
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
						options={[{ "value": "en", "label": "English" }, { "value": "ru", "label": "Russian" }]}
						closeMenuOnSelect={true}
						isMulti={false}
						defaultValue={languages.filter((item) => { return item.value === language })[0]}
						placeholder={t("components.profileEdit.choose_language")}
					/>

					<input type="submit" value={t("components.profileEdit.submit")} className='btns btns-create btns-send' onClick={handleSubmit} />
				</form>
				: <Loading />
			}

		</div>
	)
}

export default ProfileEdit