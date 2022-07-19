import React from 'react'
import { BsPencil, BsTrash } from "react-icons/bs";
import { MdModeEditOutline } from "react-icons/md";
import { RiQuestionAnswerLine } from "react-icons/ri";

export const EditOrRemove = ({ onDelete, onEdit }) => {

	return (
		<>
			<span className='sepi-header-desc__items-trash' onClick={onDelete}><BsTrash /></span>
			<span className='sepi-header-desc__items-edit' onClick={onEdit}><BsPencil /></span>
		</>
	)
}

export const DeleteMsgBtn = ({ className, onDelete }) => {
	return (
		<span className={className} onClick={onDelete}><BsTrash /></span>
	)
}

export const EditMsgBtn = ({ className, onEdit }) => {
	return (
		<span className={className} onClick={onEdit}><BsPencil /></span>
	)
}

export const ModerEditMsgBtn = ({ className, onEdit }) => {
	return (
		<span className={className} onClick={onEdit}><MdModeEditOutline /></span>
	)
}

export const AnswerMsgBtn = ({ className, onAnswer }) => {
	return (
		<span className={className} onClick={onAnswer}><RiQuestionAnswerLine /></span>
	)
}