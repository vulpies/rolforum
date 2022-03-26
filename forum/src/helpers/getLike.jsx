import React from 'react'
import { useState } from 'react';
import { BsFillSuitHeartFill, BsSuitHeart } from "react-icons/bs";

const GetLike = () => {
	const [like, setLike] = useState('')

	const handleLike = () => {
		setLike(<p>Сердечки на ремонте х0</p>)
	}

	return (
		<div className='sepi-header-desc__like' >
			<span onClick={handleLike}>{(like === 0 || like === null || like === '') ? <BsSuitHeart /> : <BsFillSuitHeartFill />}</span> {like}
		</div>
	)
}

export default GetLike