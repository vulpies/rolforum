import React, { useEffect, useState } from 'react'
import { Helmet } from "react-helmet";
import { BsPencil } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { commonFetch, commonPostReq } from '../../helpers/commonFetch'
import CommonInputs from '../../helpers/CommonInputs'
import Breadcrumbs from '../breadcrumbs'
import CustomSelect from '../CustomSelect'
import { useTranslation } from "react-i18next";
import i18n from "../../services/i18n";
import Loading from '../../helpers/loading'
import { SwallSuccess } from '../../helpers/swall_notifications'

const ProfileEdit = () => {
	const { t } = useTranslation();
	const [prof, setProf] = useState()
	const [avatar, setAvatar] = useState(prof?.user_avatar)
	const [timeZone, setTimeZone] = useState([])
	const [getUserTime, setGetUserTime] = useState({})
	const [language, setLanguage] = useState(prof?.language)
	const [formatDate, setFormatDate] = useState(prof?.dateFormat)
	const navigate = useNavigate()

	useEffect(() => {
		commonFetch('https://api.postscriptum.games/v1/profile/edit-data', setProf)
	}, [setProf])

	const time = {
		"value": prof?.timezone,
		"label": prof?.timezone
	}


	console.log(prof, 'prof')
	console.log(formatDate, 'formatDate')

	const languages = [
		{ "value": "en", "label": "English" },
		{ "value": "ru", "label": "Russian" }
	]

	const dateFormat = [
		{ 'value': 1, "label": 'YYYY-MM-DD' },
		{ 'value': 2, "label": 'DD.MM.YYYY' },
		{ 'value': 3, "label": 'DD/MM/YYYY' },
		{ 'value': 4, "label": 'DD-MM-YYYY' },
		{ 'value': 5, "label": 'MM-DD-YYYY' },
		{ 'value': 6, "label": 'MM/DD/YYYY' },
	]

	useEffect(() => {
		commonFetch('https://api.postscriptum.games/v1/timezones', setTimeZone)
	}, [])


	function handleSubmit(e) {
		e.preventDefault()

		const updUserInfo = {
			id: prof.user_id,
			avatar: avatar || prof.user_avatar,
			timeZone: getUserTime?.value || time.value,
			language: language?.value || prof.language,
			date_format: formatDate?.value || prof.date_format,
		}

		try {
			commonPostReq('https://api.postscriptum.games/v1/profile/edit', updUserInfo)
			i18n.changeLanguage(updUserInfo.language)
		} catch (err) {
			console.log(err)
		}
		SwallSuccess(t("components.profileEdit.information_saved"))
		navigate(`/profile/${prof?.user_id}`)
	}

	return (
		<div className='wrapper wrapper-profile'>

			<Helmet>
				<meta name="description" content="Edit profile" />
				<title>Edit profile</title>
			</Helmet>

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
						options={languages}
						closeMenuOnSelect={true}
						isMulti={false}
						defaultValue={languages.filter((item) => { return item.value === prof.language })[0]}
						placeholder={t("components.profileEdit.choose_language")}
					/>

					<CustomSelect
						styleDiv='profile-input__input'
						label={t("components.profileEdit.date_format")}
						onChange={(e) => setFormatDate(e)}
						options={dateFormat}
						defaultValue={dateFormat.filter((item) => item.value === prof.date_format)}
						closeMenuOnSelect={true}
						isMulti={false}
						placeholder={t("components.profileEdit.choose_date_format")}
					/>

					<input type="submit" value={t("components.profileEdit.submit")} className='btns btns-create btns-send' onClick={handleSubmit} />
				</form>
				: <Loading />
			}

		</div>
	)
}

export default ProfileEdit