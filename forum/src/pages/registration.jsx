import axios from "axios"
import React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"
import {useTranslation} from "react-i18next";

const Registration = () => {
	const { t, i18n } = useTranslation();
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
					<label>{t("registration_login")}</label>
					<input
						{...register("username", {
							required: t("registration_type_login"),
							minLength: {
								value: 5,
								message: t("registration_type_login_minimal_length"),
							},
							maxLength: {
								value: 20,
								message: t("registration_type_login_maximal_length"),
							},
							onChange: "",
							pattern: /[A-Za-z]/
						})}
					/>
				</div>
				<div className="login-input">
					<label>{t("registration_email")}</label>
					<input
						{...register("email", {
							required: t("registration_type_email"),
							onChange: "",
							pattern: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i
						})}
						type='email'
					/>
				</div>

				<div className="login-input login-input-pass">
					<label>{t("registration_password")}</label>
					<input
						{...register("password", {
							required: t("registration_type_password"),
							minLength: {
								value: 5,
								message: t("registration_type_password_minimal_length"),
							},
							maxLength: {
								value: 20,
								message: t("registration_type_password_maximal_length"),
							},
						})}
						type={showPass ? "text" : "password"}
					/>
					<button className='btns-show-pass' onClick={togglePassVisible}>
						{showPass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
					</button>
				</div>

				<div className="login-input">
					<label>{t("registration_repeat_password")}</label>
					<input
						{...register("passwordTwo", {
							required: t("registration_type_repeat_password"),
							minLength: {
								value: 5,
								message: t("registration_type_password_minimal_length"),
							},
							maxLength: {
								value: 20,
								message: t("registration_type_password_maximal_length"),
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