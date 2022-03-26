import React from 'react'
import { useEffect, useState } from 'react'
import EpiModal from '../epiModal'
import axios from "axios"


const OneEpi = () => {
	// const epiOpen = () => {
	// 	<Link to={`/episodes/${item.id}`} />
	// }


	const [info, setInfo] = useState([])
	const url = 'https://api.rolecrossways.com/v1/episode-list-view';

	useEffect(() => {
		axios.get(url)
			.then(res => setInfo(res.data))
			.catch(error =>
				console.log(error)
			)
	}, [setInfo])

	console.log(info)

	return (
		<>
			{info && info.map((item) => (<div className='epi-wrapper' key={item.id}>
				<a href={`/episodes/${item.id}`} className='epi-title'>
					<span className='epi-fandom'>[{item.fandoms}]</span> - <span className='epi-name'>{item.title}</span>
				</a>

				<EpiModal
					name='Подсмотреть'
					className='btns btns-common'
					link={`/episodes/${item.id}`}
					epiName={item.title}
					fandom={item.fandoms.length > 1 ? item.fandoms.join(', ') : item.fandoms[0]}
					image='https://i.pinimg.com/736x/02/bd/c1/02bdc11f4cd3639482319280979c3d1f--blog-manga.jpg'
					members={item.characters}
					text={item.summary} />

			</div>
			))}
		</>
	)
}

export default OneEpi