import React from 'react'
import { useState, useEffect } from 'react'
import Breadcrumbs from '../components/breadcrumbs'
import CommonInputs from '../helpers/CommonInputs'

const ResetPass = () => {
	const [newPass, setNewPass] = useState('')
	const [confirmPass, setConfirmPass] = useState('')
	const [err, setErr] = useState('')

	useEffect(() => {
		if (newPass !== confirmPass && confirmPass !== '') {
			setErr('Пароли не совпадают!')
		} else {
			setErr('')
		}

		if (newPass !== '' && newPass.length < 5) {
			setErr('Длина пароля не менее 5 символов!')
		}

		if (newPass.length > 20) {
			setErr('Длина пароля не более 20 символов!')
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
		// navigate(`/`)
	}

	return (
		<div className='wrapper'>

			<div className='epi-links single-link'>
				<Breadcrumbs name="Сброс пароля" />
			</div>

			<div className='profile-input__wrapper'>
				<CommonInputs
					type='password'
					inputName='Новый пароль:'
					className='profile-input__input'
					value={newPass}
					onChange={(e) => setNewPass(e.target.value)}
				/>
				<CommonInputs
					type='password'
					inputName='Подтвердите пароль:'
					className='profile-input__input'
					value={confirmPass}
					onChange={(e) => setConfirmPass(e.target.value)}
				/>
				<div className='login-error'>
					{err ?
						<p>{err || "Проверьте правильность ввода данных!"}</p>
						: ''}
				</div>

				<input type="submit"
					value="Сохранить"
					className='btns btns-create btns-send'
					disabled={err}
					onClick={handleSubmit} />
			</div>
		</div>
	)
}

export default ResetPass