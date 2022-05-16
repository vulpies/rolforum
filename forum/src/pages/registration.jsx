import axios from "axios"
import React from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import authService from "../services/auth.service"
import { addUserInfo } from '../store/usersSlice'

const Registration = () => {
	const dispatch = useDispatch()

	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm({ mode: "onBlur" })

	const onSubmit = async () => {
		const info = getValues()
		console.log(info)

		axios.post('https://api.rolecrossways.com/register')
			.then(data => console.log(data))

		// const response = await authService.login(info)

		// localStorage.setItem('token', response.token)
		// localStorage.setItem('username', info.username)


		// let options = {}

		// if (localStorage.getItem('token')) {
		// 	options = {
		// 		headers: {
		// 			'Authorization': `Bearer ${localStorage.getItem('token')}`
		// 		}
		// 	}
		// }

		// axios.get('https://api.rolecrossways.com/v1/me', options)
		// 	.then(res => {
		// 		console.log(res.data)
		// 		if (res.data.user_id !== null) {
		// 			dispatch(addUserInfo(res.data))
		// 		}
		// 	})
		// 	.catch(err => console.log(err))

		// return response
	}


	return (
		<form className='login-wrapper' onSubmit={handleSubmit(onSubmit)}>
			<div className='login'>
				<div className="login-input">
					<label>Логин</label>
					<input
						{...register("username", {
							required: "Введите логин",
							minLength: {
								value: 3,
								message: "Минимальная длина логина 5 символов",
							},
							maxLength: {
								value: 30,
								message: "Максимальная длина логина 20 символов",
							},
							onChange: "",
							pattern: /[A-Za-z]/
						})}
					/>
				</div>
				<div className="login-input">
					<label>E-mail</label>
					<input
						{...register("email", {
							required: "Введите email",
							onChange: "",
							pattern: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i
						})}
						type='email'
					/>
				</div>

				<div className="login-input">
					<label>Пароль</label>
					<input
						{...register("password", {
							required: "Введите пароль",
							minLength: {
								value: 5,
								message: "Минимальная длина пароля 5 символов",
							},
							maxLength: {
								value: 20,
								message: "Максимальная длина пароля 20 символов",
							},
						})}
						type='password'
					/>

				</div>

				<div className='login-error'>
					{errors?.username && (
						<p>{errors?.username?.message || "Проверьте логин"}</p>
					)}
					{errors?.email && (
						<p>
							{errors?.email?.message ||
								"Email введен некорректно"}
						</p>
					)}
					{errors?.password && (
						<p>
							{errors?.password?.message ||
								"Уточните пароль"}
						</p>
					)}
					{/* {serverErrors?.message} */}
				</div>


				<input
					type="submit"
					className='btns btns-common btns-log'
					value='Войти'
				/>
			</div>
		</form>
	)
}

export default Registration