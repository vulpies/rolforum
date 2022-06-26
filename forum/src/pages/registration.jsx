import axios from "axios"
import React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"

const Registration = () => {
	const navigate = useNavigate()
	const [serverErrors, setServerErrors] = useState("")
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

	const onSubmit = async () => {
		const info = getValues()
		console.log(info)

		if (info.password !== info.passwordTwo) {
			setServerErrors("Пароли не совпадают!")
		}

		axios.post('https://api.postscriptum.games/register', info)
			.then(data => {
				console.log(data)
				if (data.data.token) {
					localStorage.setItem('token', data.data.token)
					localStorage.setItem('username', info.username)
					navigate(`/index`)
				}
			}).catch(err => console.log(err))
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

				<div className="login-input login-input-pass">
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
						type={showPass ? "text" : "password"}
					/>
					<button className='btns-show-pass' onClick={togglePassVisible}>
						{showPass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
					</button>
				</div>

				<div className="login-input">
					<label>Подтвердите пароль</label>
					<input
						{...register("passwordTwo", {
							required: "Подтвердите пароль",
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
					{serverErrors ? serverErrors : ''}
				</div>

				<input
					disabled={!isValid}
					type="submit"
					className='btns btns-common btns-log'
					value='Войти'
				/>
			</div>
		</form>
	)
}

export default Registration