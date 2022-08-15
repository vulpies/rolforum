import React from 'react'
import { useEffect, useState } from 'react'
import { commonFetch } from '../../helpers/commonFetch'
import { useNavigate } from 'react-router-dom'
import ModalEpi from '../forms/modalEpi'
import { useTranslation } from "react-i18next";
import { BsSearch } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import { useGetEpisodesListQuery } from '../../store/apiSlice'
import Loading from '../../helpers/loading'

const OneEpi = () => {
	const { t } = useTranslation();
	const navigate = useNavigate()
	const [value, setValue] = useState('')
	const [show, setShow] = useState(false)

	const { data: episodes = [], isLoading } = useGetEpisodesListQuery()
	console.log(episodes, 'data9999')

	const filteredEpies = episodes?.filter(epi => (epi.title.toLowerCase().includes(value)))

	if (isLoading) return <Loading />

	return (
		<>
			<div className='epi-search'>
				<form className="epi-search__form">
					<input type="text"
						value={value}
						placeholder="Поиск по названиям..."
						className="epi-search__input"
						onChange={(e) => setValue(e.target.value)}
					/>
				</form>
				<p className='epi-search__btn-search'><BsSearch /></p>
				<button className='epi-search__btn-close' onClick={() => setValue('')}><CgClose /></button>
			</div>

			{filteredEpies?.map((item) => (
				<div className='epi-wrapper' key={item.id}>
					<div className='epi-text-info'>
						<a href={`/episodes/${item.id}`} className='epi-title'>
							<span className='epi-fandom'>[{item.fandoms.length > 1 ? item.fandoms.join(', ') : item.fandoms[0]}]</span> — <span className='epi-name'>{item.title}</span>
						</a>

						<ModalEpi
							show={show}
							id={item.id}
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
							onClick={() => setShow(item.id)}
						>
							{t("components.oneEpi.view")}
						</button>

					</div>

					<div className='epi-user-info'>
						<div className='epi-user-info__avatar'>
							<img src={item?.last_author?.avatar} alt='' onClick={() => navigate(`/characters/${item.last_author.id}`)} />
						</div>
						{item.last_post_id ?
							<p><a href={`/episodes/${item.id}#p${item.last_post_id}`}>{item?.last_updated_at}</a></p>
							:
							<p>{item?.last_updated_at}</p>
						}
					</div>
				</div>
			))}
		</>
	)
}

export default OneEpi