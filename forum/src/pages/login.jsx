import axios from "axios"
import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import authService from "../services/auth.service"
import { addUserInfo } from '../store/usersSlice'
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"

const Login = () => {
	const dispatch = useDispatch()
	const [serverErr, setServerErr] = useState('')
	const [showPass, setShowPass] = useState(false)

	function togglePassVisible(e) {
		e.preventDefault()
		setShowPass((prevState) => !prevState)
	}

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		getValues,
	} = useForm({ mode: "all" })

	useEffect(() => {

	}, [serverErr])

	const onSubmit = async () => {
		const info = getValues()
		const response = await authService.login(info)

		localStorage.setItem('token', response.token)
		localStorage.setItem('username', info.username)


		let options = {}

		if (localStorage.getItem('token')) {
			options = {
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`
				}
			}
		}

		axios.get('https://api.postscriptum.games/v1/me', options)
			.then(res => {
				if (res.data.user_id !== null) {
					dispatch(addUserInfo(res.data))
				}
			})
			.catch(err => {
				console.log(err.response, '777')
				if (err.response.data.message === 'Invalid JWT Token') {
					setServerErr('Проверьте правильность ввода данных!')
				}
			})


		return response
	}


	return (
		<form className='login-wrapper' onSubmit={handleSubmit(onSubmit)}>
			<div className='login'>
				<div className="login-input">
					<label>Логин </label>
					<input
						{...register("username", {
							required: "Без логина не пустим, упс!",
							onChange: "",
							pattern: /[A-Za-z]/
						})}
					/>
				</div>

				<div className="login-input login-input-pass">
					<label>Пароль </label>
					<input
						{...register("password", {
							required: "Для входа нужен пароль!",
							minLength: {
								value: 5,
								message: "Минимальная длина пароля 5 символов",
							},
							maxLength: {
								value: 20,
								message: "Максимальная длина пароля 20 символов",
							},
						})}
						type={showPass ? "text" : "password"}
					/>
					<button className='btns-show-pass' onClick={togglePassVisible}>
						{showPass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
					</button>
				</div>

				<div className='login-error'>
					{errors?.username && (
						<p>{errors?.username?.message || "Проверьте правильность ввода данных!"}</p>
					)}
					{errors?.password && (
						<p>
							{errors?.password?.message ||
								"Проверьте правильность ввода данных!"}
						</p>
					)}
					{serverErr ? <p>{serverErr}</p> : ''}
				</div>


				<input
					type="submit"
					className='btns btns-common btns-log'
					disabled={!isValid}
					value='Войти'
				/>
			</div>
		</form>
	)
}

export default Login