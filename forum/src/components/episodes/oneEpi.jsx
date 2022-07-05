import React from 'react'
import { useEffect, useState } from 'react'
import { commonFetch } from '../../helpers/commonFetch'
// import EpiModal from '../forms/epiModal'
import { useNavigate } from 'react-router-dom'
import ModalEpi from '../forms/modalEpi'

const OneEpi = () => {
	const [info, setInfo] = useState([])
	const url = 'https://api.postscriptum.games/v1/episode-list-view'
	const navigate = useNavigate()

	const [show, setShow] = useState(false)

	useEffect(() => {
		commonFetch(url, setInfo)
	}, [setInfo, url])


	return (
		<>
			{info && info?.map((item) => (
				<div className='epi-wrapper' key={item.id}>
					<div className='epi-text-info'>
						<a href={`/episodes/${item.id}`} className='epi-title'>
							<span className='epi-fandom'>[{item.fandoms.length > 1 ? item.fandoms.join(', ') : item.fandoms[0]}]</span> - <span className='epi-name'>{item.title}</span>
						</a>

						<ModalEpi
							show={show}
							link={`/episodes/${item.id}`}
							epiName={item.title}
							fandom={item.fandoms.length > 1 ? item.fandoms.join(', ') : item.fandoms[0]}
							image={item.image}
							members={item.characters.map(c => (c.mask ? c.mask : c.name))}
							text={item.summary}
							onClose={() => setShow(false)}
						/>

						<button
							className='btns btns-common'
							onClick={() => setShow(true)}
						>
							Подсмотреть
						</button>

						{/* <EpiModal
							name='Подсмотреть'
							className='btns btns-common'
							link={`/episodes/${item.id}`}
							epiName={item.title}
							fandom={item.fandoms.length > 1 ? item.fandoms.join(', ') : item.fandoms[0]}
							image={item.image}
							members={item.characters.map(c => (c.mask ? c.mask : c.name))}
							text={item.summary} /> */}

					</div>

					<div className='epi-user-info'>
						<div className='epi-user-info__avatar'>
							<img src={item?.last_author?.avatar} alt='' onClick={() => navigate(`/characters/${item.last_author.id}`)} />
						</div>
						<p>{item?.last_updated_at}</p>
					</div>
				</div>
			))}
		</>
	)
}

export default OneEpi