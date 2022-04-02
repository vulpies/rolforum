import React from 'react'
import { useState } from 'react';
import { BsFillSuitHeartFill, BsSuitHeart } from "react-icons/bs";

const GetLike = () => {
	const [like, setLike] = useState('')

	const handleLike = () => {
		setLike(<p>Сердечки на ремонте х0</p>)
	}

	return (
		<>
			<span className='sepi-header-desc__items-like' onClick={handleLike}>{(like === 0 || like === null || like === '') ? <BsSuitHeart /> : <BsFillSuitHeartFill />}</span> {like}
		</>
	)
}

export default GetLike