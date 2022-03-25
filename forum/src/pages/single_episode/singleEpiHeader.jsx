import React from 'react'
import { useState } from 'react';
import { BsFillSuitHeartFill, BsSuitHeart } from "react-icons/bs";

const SingleEpiHeader = ({ header }) => {
	const [like, setLike] = useState('')

	const handleLike = () => {
		setLike(<p>Сердечки на ремонте х0</p>)
	}

	console.log(header, 'header')

	const userList = []

	header.characters.map(m => m.mask ? userList.push(m.mask) : userList.push(m.name))

	return (
		<div className='sepi-wrapper'>

			<div className='sepi-header-title'>
				<p className='sepi-header-title__author'>Leto II Atreides</p>
				<p className='sepi-header-title__date'>2020-01-01</p>
			</div>

			<div style={{ "borderBottom": "1px solid black" }}></div>

			<div className='sepi-header-desc'>

				<div className='sepi-header-desc__title'>
					<span className='epi-fandom'>{header.fandoms.length > 1 ? header.fandoms.join(', ') : header.fandoms[0]} </span>
					- {header.title}
				</div>

				<div className='sepi-header-desc__image'>
					<img src='https://i.pinimg.com/736x/02/bd/c1/02bdc11f4cd3639482319280979c3d1f--blog-manga.jpg' alt='картинка эпа' />
				</div>

				<div className='sepi-header-desc__members'>
					{userList.join(', ')}
				</div>

				<div className='sepi-header-desc__subtitle'>
					{header.summary}
				</div>

				<div className='sepi-header-desc__like'>
					<span onClick={handleLike}>{(like === 0 || like === null || like === '') ? <BsSuitHeart /> : <BsFillSuitHeartFill />}</span> {like}
				</div>

			</div>

		</div>
	)
}

export default SingleEpiHeader