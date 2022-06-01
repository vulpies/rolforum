import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import CommonInputs from '../../helpers/CommonInputs'
import Breadcrumbs from '../breadcrumbs'

const ProfileEditPass = () => {
	const [user] = useSelector((state) => state.usersReducer.user)
	const [oldPass, setOldPass] = useState('')
	const [newPass, setNewPass] = useState('')
	const [confirmPass, setConfirmPass] = useState('')
	const [err, setErr] = useState('')

	useEffect(() => {
		if (newPass !== confirmPass && confirmPass !== '') {
			setErr('Пароли не совпадают!')
		} else {
			setErr('')
		}

		if ((oldPass !== '' && newPass !== '') && oldPass === newPass) {
			setErr('Старый и новый пароли совпадают!')
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
		// navigate(`/profile/${user?.user_id}`)
	}

	return (
		<div className='wrapper'>
			<div className='sepi-bread-header extra'>
				<Breadcrumbs name='Пароль' link={`/profile/${user?.user_id}`} extraName="Профиль" />
			</div>
			<div className='profile-input__wrapper'>
				<CommonInputs
					type='password'
					inputName='Старый пароль:'
					className='profile-input__input'
					value={oldPass}
					onChange={(e) => setOldPass(e.target.value)}
				/>
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

export default ProfileEditPass