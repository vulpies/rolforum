import React from "react"
import { useForm } from "react-hook-form"
import authService from "../services/auth.service"

const Login = () => {
	// const [serverErrors, setServerErrors] = useState("")


	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm({ mode: "onBlur" })

	const onSubmit = async () => {
		const info = getValues()
		const response = await authService.login(info)
		console.log(response, 'response111')
		localStorage.setItem('user', info.username)

		return response
	}

	return (
		<form className='login-wrapper' onSubmit={handleSubmit(onSubmit)}>
			<div className='login'>
				<div className="login-input">
					<label>Логин </label>
					<input
						{...register("username", {
							required: "Необходимо ввести логин",
							onChange: "",
							pattern: /[A-Za-z]/
						})}
					/>
				</div>

				<div className="login-input">
					<label>Пароль </label>
					<input
						{...register("password", {
							required: "Необходимо ввести пароль",
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