import React from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import authService from "../services/auth.service"
import { getOneUser } from "../store/usersSlice"

const Login = () => {
	const dispatch = useDispatch()
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm({ mode: "onBlur" })

	const onSubmit = async () => {
		const info = getValues()
		const response = await authService.login(info)

		localStorage.setItem('token', response.token)
		localStorage.setItem('username', info.username)

		dispatch(getOneUser())

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

				<div className="login-input">
					<label>Пароль </label>
					<input
						{...register("password", {
							required: "И пароль для входа тоже нужен!",
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
						<p>{errors?.username?.message || "Проверьте правильность ввода данных!"}</p>
					)}
					{errors?.password && (
						<p>
							{errors?.password?.message ||
								"Проверьте правильность ввода данных!"}
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

export default Login