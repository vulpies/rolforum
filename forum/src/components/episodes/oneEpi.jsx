import React from 'react'
import { useEffect, useState } from 'react'
import EpiModal from '../epiModal'
import axios from "axios"
// import { useHttp } from '../../hooks/useHttp'


const OneEpi = () => {
	const epiOpen = () => {
		console.log('divdsn')
	}

	const [info, setInfo] = useState([])
	const url = 'https://api.rolecrossways.com/v1/episode-list-view';

	axios.get(url)
		.then(res => setInfo(res.data))


	// const getEpiInfo = async () => {
	// 	const url = 'https://api.rolecrossways.com/v1/episode-list-view';
	// 	let res = await fetch(url)
	// 	let data = await res.json();

	// 	setInfo(data)
	// }

	// useEffect(() => { getEpiInfo() }, [])

	const userList = []

	return (
		<>
			{info && info.map((item) => (<div className='epi-wrapper' key={item.id}>
				<div className='epi-title' onClick={epiOpen}>
					<span className='epi-fandom'>[{item.fandoms}]</span> - <span className='epi-name'>{item.title}</span>
				</div>

				<EpiModal
					name='Подсмотреть'
					className='btns btns-common'
					epiName={item.title}
					fandom={item.fandoms.length > 1 ? item.fandoms.join(', ') : item.fandoms[0]}
					image='https://i.pinimg.com/736x/02/bd/c1/02bdc11f4cd3639482319280979c3d1f--blog-manga.jpg'
					members={item.characters.map(m => {
						userList.push(m.name)

						// console.log(userList, 'userList')

						return userList.join(', ')
					})}

					text={item.summary} />

			</div>
			))}
		</>
	)
}

export default OneEpi