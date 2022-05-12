import React from 'react'

const ProfileInputs = ({ inputName, type, disabled, value, className, onChange, placeholder }) => {
	return (
		<>
			<label>{inputName}</label>
			<input
				type={type}
				className={className}
				value={value}
				onChange={onChange}
				disabled={disabled}
				placeholder={placeholder}
			/>
		</>
	)
}

export default ProfileInputs