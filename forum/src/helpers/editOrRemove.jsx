import React from 'react'
import { BsPencil, BsTrash } from "react-icons/bs";

const EditOrRemove = ({ onDelete }) => {

	return (
		<>
			<span className='sepi-header-desc__items-trash' onClick={onDelete}><BsTrash /></span>
			<span className='sepi-header-desc__items-edit'><BsPencil /></span>
		</>
	)
}

export default EditOrRemove