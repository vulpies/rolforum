import React from 'react'
import { useCallback } from 'react';
import { useState } from 'react';
import { BsFillSuitHeartFill, BsSuitHeart } from "react-icons/bs";

const GetLike = () => {
	const [liked, setLiked] = useState(false)

	const handleLike = useCallback(() => {
		setLiked(true)
	}, [])

	//<p>Сердечки на ремонте х0</p>

	return (
		<>

			{liked ?
				<span className='sepi-header-desc__items-like sepi-items-liked'><BsFillSuitHeartFill /></span> : <span className='sepi-header-desc__items-like' onClick={handleLike}>
					<BsSuitHeart />
				</span>}

		</>
	)
}

export default GetLike