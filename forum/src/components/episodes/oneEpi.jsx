import React from 'react'
import { useEffect, useState } from 'react'
import EpiModal from '../epiModal'
import { commonFetch } from '../../helpers/commonFetch'


const OneEpi = () => {
	const [info, setInfo] = useState([])
	const url = 'https://api.rolecrossways.com/v1/episode-list-view';

	useEffect(() => {
		commonFetch(url, setInfo)
	}, [setInfo, url])

	console.log(info, 'info')

	return (
		<>
			{info && info.map((item) => (<div className='epi-wrapper' key={item.id}>
				<a href={`/episodes/${item.id}`} className='epi-title'>
					<span className='epi-fandom'>[{item.fandoms.length > 1 ? item.fandoms.join(', ') : item.fandoms[0]}]</span> - <span className='epi-name'>{item.title}</span>
				</a>

				<EpiModal
					name='Подсмотреть'
					className='btns btns-common'
					link={`/episodes/${item.id}`}
					epiName={item.title}
					fandom={item.fandoms.length > 1 ? item.fandoms.join(', ') : item.fandoms[0]}
					image={item.image}
					members={item.characters.map(c => (c.mask ? c.mask : c.name))}
					text={item.summary} />

			</div>
			))}
		</>
	)
}

export default OneEpi