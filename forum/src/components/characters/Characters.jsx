import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CommonBigBtn from '../../helpers/big_btn'
import { commonFetch } from '../../helpers/commonFetch'
import Breadcrumbs from '../breadcrumbs'

const Characters = () => {
	const [user] = useSelector((state) => state.usersReducer.user)
	const [info, setInfo] = useState()
	const navigate = useNavigate()

	useEffect(() => {
		commonFetch(`https://api.postscriptum.games/v1/profile/character-list/${user?.user_id}`, setInfo)
	}, [setInfo, user])

	console.log(info, 99999)

	return (
		<div className='wrapper'>

			<div className='epi-links single-link'>
				<Breadcrumbs name="Все персонажи" />
			</div>

			<CommonBigBtn
				className="create-char-btn"
				classNameBtn='btns btns-create'
				onClick={() => navigate(`/create`)}
				name="Создать персонажа"
			/>

			<div className='chars-common'>
				<p>Активные персонажи:</p>
				<div className="chars-active">
					{info ? info?.characters?.map(char => {
						return <div className='chars-wrapper' key={char.id}>
							<div className='chars-card'>
								<div className='char__info'>
									<p>{char.name}</p>
									<img src={char.avatar} alt='' />
									<span>[{char.fandom_name}]</span>
								</div>
								<div className='char__stats'>
									<p><span>Постов:</span> {char?.total_posts}</p>
									<p><span>Появлялся:</span><br /> {char?.last_post}</p>
								</div>
								<button className='btns btns-char' onClick={() => navigate(`/my_chars/:${char.id}`)}>Открыть</button>
							</div>
						</div>
					}) : 'На данный момент нет'}
				</div>

				{info?.applications ?
					<>
						<div className="chars-pending__title">

							<p>На проверке:</p>
						</div>
						<div className="chars-pending">
							{info?.applications.map(app => {
								return <div className='chars-pending__wrapper' key={app.id}>
									<a href={`/char_app/${app.id}`}><span>[{app.fandom_name}]</span> {app.character_name}</a>
									<p>Создано: {app.created_at.slice(0, 10)}</p>
								</div>
							})}

						</div>
					</> : ''

				}
			</div>
		</div>
	)
}

export default Characters