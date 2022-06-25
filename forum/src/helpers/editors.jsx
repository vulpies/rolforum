import React from 'react'
import { AiOutlineBold } from "react-icons/ai";
import { GrItalic, GrUnderline, GrStrikeThrough } from "react-icons/gr";


const fontStyleIcons = [
	{
		name: 'bold',
		icon: <AiOutlineBold />,
		teg: 'b'
	},
	{
		name: 'italic',
		icon: <GrItalic />,
		teg: 'i'
	},
	{
		name: 'underline',
		icon: <GrUnderline />,
		teg: 'u'
	},
	{
		name: 'strikethrough',
		icon: <GrStrikeThrough />,
		teg: 's'
	}
]

const Editors = ({ className, param, setParam, sign }) => {

	function styleEditor(param, setParam, sign) {
		setParam(param.concat(`[${sign}][/${sign}]`))
	}

	const editorBtns = fontStyleIcons.map((item) => {
		return <button className='btns btns-editor' onClick={() => styleEditor(param, setParam, item.teg)}>{item.icon}</button>
	})

	return (
		<div className={className}>
			{editorBtns}
		</div>
	)
}

export default Editors