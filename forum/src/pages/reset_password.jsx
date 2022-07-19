import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Breadcrumbs from '../components/breadcrumbs'
import { commonFetch, commonPostReq } from '../helpers/commonFetch'
import CommonInputs from '../helpers/CommonInputs'
import { useTranslation } from 'react-i18next'
import { SwallSuccess } from '../helpers/swall_notifications'

const ResetPass = () => {
	const { t } = useTranslation();
	const [newPass, setNewPass] = useState('')
	const [confirmPass, setConfirmPass] = useState('')
	const [err, setErr] = useState('')
	const navigate = useNavigate()
	const token = window.location.search.slice(7)

	useEffect(() => {
		commonFetch(`https://api.postscriptum.games/v1/password/confirm/${token}`)
	}, [token])

	useEffect(() => {
		if (newPass !== confirmPass && confirmPass !== '') {
			setErr(t("pages.reset_pass.different_pass"))
		} else {
			setErr('')
		}

		if (newPass !== '' && newPass.length < 5) {
			setErr(t("pages.registration.password_minimal_length"))
		}

		if (newPass.length > 20) {
			setErr(t("pages.registration.password_maximal_length"))
		}
	}, [newPass, confirmPass])

	function handleSubmit(e) {
		e.preventDefault()

		if (token && !err) {
			commonPostReq('https://api.postscriptum.games/v1/password/reset', {
				"token": token,
				"password": newPass
			})
		}

		SwallSuccess(t("pages.reset_pass.saved_pass"))

		navigate(`/index`)
	}

	return (
		<div className='wrapper'>

			{token ? <>
				<div className='epi-links single-link'>
					<Breadcrumbs name={t("pages.reset_pass.reset_pass")} />
				</div>

				<div className='profile-input__wrapper'>

					<CommonInputs
						type='password'
						inputName={t("pages.reset_pass.new_pass")}
						className='profile-input__input'
						value={newPass}
						onChange={(e) => setNewPass(e.target.value)}
					/>
					<CommonInputs
						type='password'
						inputName={t("pages.reset_pass.repeat_pass")}
						className='profile-input__input'
						value={confirmPass}
						onChange={(e) => setConfirmPass(e.target.value)}
					/>
					<div className='login-error'>
						{err ?
							<p>{err || t("pages.reset_pass.check_info")}</p>
							: ''}
					</div>

					<input type="submit"
						value={t("pages.reset_pass.save_btn")}
						className='btns btns-create btns-send'
						disabled={err}
						onClick={handleSubmit} />
				</div>
			</> : <p style={{ textAlign: 'center', marginTop: 20 }}>Информация на странице видна только при смене пароля</p>}




		</div>
	)
}

export default ResetPass