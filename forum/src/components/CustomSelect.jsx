import React from 'react'
import Select from 'react-select'

function customTheme(theme) {
	return {
		...theme,
		colors: {
			...theme.colors,
			primary25: '#ffe769ab',
			primary: 'orange',
			primary50: '#fff45b'
		}
	}
}

const colorStyles = {
	option: (styles, state) => {
		return {
			...styles,
			borderBottom: '1px dashed #a60d02e8',
			color: state.isSelected ? '#c60000' : '#cc9e00',
			backgroundColor: state.isFocused ? '#fbc972' : '#feee96b0',
			padding: '10px 0',
			minHeight: 50,
			height: 'auto'

		};
	},
	multiValueLabel: (provided, state) => {
		return {
			...provided,
			backgroundColor: state.isSelected ? 'transparent' : '#ffee7d',
			textAlign: 'center'
		}
	},
	menuList: (provided) => {
		return {
			...provided,
			backgroundColor: '#feee96b0',
		}
	},
};

const CustomSelect = ({ styleDiv, label, options, onChange, styleSelect, placeholder, isMulti, isDisabled, defaultValue, closeMenuOnSelect }) => {

	return (
		<div className={styleDiv}>
			<h4>{label}</h4>
			<Select
				theme={customTheme}
				closeMenuOnSelect={closeMenuOnSelect}
				options={options}
				onChange={onChange}
				className={styleSelect}
				placeholder={placeholder}
				isMulti={isMulti}
				styles={colorStyles}
				isDisabled={isDisabled}
				defaultValue={defaultValue}
			/>
		</div>
	)
}

export default CustomSelect