import React from 'react'
import { BsPencilSquare, BsTrash } from "react-icons/bs";

const EditOrRemove = () => {

	return (
		<>
			<span className='sepi-header-desc__items-trash'><BsTrash /></span>
			<span className='sepi-header-desc__items-edit'><BsPencilSquare /></span>
		</>
	)
}

export default EditOrRemove