import React from 'react'
import {
	AiOutlineBold, AiOutlineAlignLeft, AiOutlineAlignCenter, AiOutlineAlignRight,
} from "react-icons/ai";
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

const alignIcons = [
	{
		name: 'align_left',
		icon: <AiOutlineAlignLeft />,
		teg: 'left'
	},
	{
		name: 'align_center',
		icon: <AiOutlineAlignCenter />,
		teg: 'center'
	},
	{
		name: 'align_right',
		icon: <AiOutlineAlignRight />,
		teg: 'right'
	}
]

const Editors = ({ className, param, setParam, id }) => {

	function hignlightText(param, setParam, sign) {
		const setectedText = window.getSelection().toString();
		const area = document.getElementById(id)

		const start = param.slice(0, area.selectionStart)
		const end = param.slice(area.selectionEnd)

		setParam(`${start} [${sign}]${setectedText}[/${sign}] ${end}`)
	}

	function styleEditor(param, setParam, sign) {
		setParam(param.concat(`[${sign}][/${sign}]`))

		if (window.getSelection()) {
			hignlightText(param, setParam, sign)
		}
	}

	function alignEditor(param, setParam, sign) {
		setParam(param.concat(`[align=${sign}][/align]`))

		if (window.getSelection()) {
			hignlightText(param, setParam, sign)
		}
	}

	const styleTextBtns = fontStyleIcons.map((item) => {
		return <button className='btns btns-editor' onClick={() => styleEditor(param, setParam, item.teg)} key={item.name}>{item.icon}</button>
	})

	const alignTextBtns = alignIcons.map((item) => {
		return <button className='btns btns-editor' onClick={() => alignEditor(param, setParam, item.teg)} key={item.name}>{item.icon}</button>
	})

	return (
		<div className={className}>
			{styleTextBtns} {alignTextBtns}
		</div>
	)
}

export default Editors