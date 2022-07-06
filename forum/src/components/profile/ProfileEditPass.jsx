import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import CommonInputs from '../../helpers/CommonInputs'
import Breadcrumbs from '../breadcrumbs'
import { useTranslation } from "react-i18next";

const ProfileEditPass = () => {
	const { t } = useTranslation();
	const [user] = useSelector((state) => state.usersReducer.user)
	const [oldPass, setOldPass] = useState('')
	const [newPass, setNewPass] = useState('')
	const [confirmPass, setConfirmPass] = useState('')
	const [err, setErr] = useState('')

	useEffect(() => {
		if (newPass !== confirmPass && confirmPass !== '') {
			setErr(t("components.profileEditPass.passwords_not_match"))
		} else {
			setErr('')
		}

		if ((oldPass !== '' && newPass !== '') && oldPass === newPass) {
			setErr(t("components.profileEditPass.old_password_match"))
		}

		if (newPass !== '' && newPass.length < 5) {
			setErr(t("components.profileEditPass.min_password"))
		}

		if (newPass.length > 20) {
			setErr(t("components.profileEditPass.max_password"))
		}
	}, [newPass, confirmPass])

	function handleSubmit(e) {
		e.preventDefault()

		// Swal.fire({
		// 	width: 350,
		// 	position: 'top',
		// 	text: 'Пароль изменен!',
		// 	icon: 'success'
		// })
		// navigate(`/profile/${user?.user_id}`)
	}

	return (
		<div className='wrapper'>
			<div className='sepi-bread-header extra'>
				<Breadcrumbs name={t("components.profileEditPass.password")} link={`/profile/${user?.user_id}`} extraName="Профиль" />
			</div>
			<div className='profile-input__wrapper'>
				<CommonInputs
					type='password'
					inputName={t("components.profileEditPass.old_password")}
					className='profile-input__input'
					value={oldPass}
					onChange={(e) => setOldPass(e.target.value)}
				/>
				<CommonInputs
					type='password'
					inputName={t("components.profileEditPass.new_password")}
					className='profile-input__input'
					value={newPass}
					onChange={(e) => setNewPass(e.target.value)}
				/>
				<CommonInputs
					type='password'
					inputName={t("components.profileEditPass.repeat_password")}
					className='profile-input__input'
					value={confirmPass}
					onChange={(e) => setConfirmPass(e.target.value)}
				/>
				<div className='login-error'>
					{err ?
						<p>{err || t("components.profileEditPass.check_data")}</p>
						: ''}
				</div>

				<input type="submit"
					value={t("components.profileEditPass.submit")}
					className='btns btns-create btns-send'
					disabled={err}
					onClick={handleSubmit} />
			</div>
		</div>
	)
}

export default ProfileEditPass