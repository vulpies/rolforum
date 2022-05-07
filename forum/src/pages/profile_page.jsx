import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { BsPencilSquare, BsChatText } from 'react-icons/bs'
import { useParams } from 'react-router-dom'
import Breadcrumbs from '../components/breadcrumbs'
import { commonFetch } from '../helpers/commonFetch'

const Profile = () => {
	const search = useParams();
	const [info, setInfo] = useState([])

	useEffect(() => {
		commonFetch(`https://api.rolecrossways.com/v1/profile/${search.profId}`, setInfo)
	}, [setInfo])
	console.log(info, 'info')

	return (
		<div className='wrapper'>
			<div className='epi-links single-link'>
				<Breadcrumbs name="Профиль" />
			</div>

			{info ? <div className='profile-wrapper'>
				<div className='profile-wrapper__mobile'>
					<div className='profile-top'>
						<p className='profile-name'>Профиль: <span>{info.user_name}</span></p>
						{info.user_name === localStorage.getItem('username') ? <button className='btns profile-edit'><BsPencilSquare /></button> : ''}
						<button className='btns profile-chat'><BsChatText /></button>
					</div>

					<div className='profile-avatar'>
						<img src={info.user_avatar} className='profile-avatar-img' alt='' />

						<div className='profile-chars'>
							<p>Доступные персонажи:</p>
							<div className='profile-chars-list'>
								{info.characters ? info.characters.map(c =>
									<img src={c.avatar} key={c.id} alt={c.name} className='profile-chars-img' />
								) : 'На текущий момент нет'}

							</div>
						</div>

					</div>

					<div className='profile-common__info'>
						<p>Зарегистрирован: <span>00/00/0000</span></p>
						<p>Репутация: <span>999999999</span></p>
						<p>Сообщений: <span>999999999</span></p>
						<p>Игровых постов: <span>999999999</span></p>
						<p>Активных эпизодов: <span>999999999</span></p>
						<p>Последний визит: <span>00/00/0000</span></p>
						<p>Последнее сообщение: <span>00/00/0000</span></p>
					</div>

				</div>

				<div className='profile-wrapper__tabdesk'>
					<div className='profile-top'>
						<p className='profile-name'>Профиль: <span>{info.user_name}</span></p>
						{info.user_name === localStorage.getItem('username') ? <button className='btns profile-edit'><BsPencilSquare /></button> : ''}
						<button className='btns profile-chat'><BsChatText /></button>
					</div>

					<div className='profile-wrapper__common'>

						<div className='profile-wrapper__common-left'>
							<div className='profile-avatar'>
								<img src={info.user_avatar} className='profile-avatar-img' alt='' />

								<div className='profile-chars'>
									<p>Доступные персонажи:</p>
									<div className='profile-chars-list'>
										{info.characters ? info.characters.map(c =>
											<img src={c.avatar} key={c.id} alt={c.name} className='profile-chars-img' />
										) : 'На текущий момент нет'}

									</div>
								</div>
							</div>
						</div>

						<div className='profile-wrapper__common-right'>
							<div className='profile-common__info'>
								<p>Зарегистрирован: <span>00/00/0000</span></p>
								<p>Репутация: <span>999999999</span></p>
								<p>Сообщений: <span>999999999</span></p>
								<p>Игровых постов: <span>999999999</span></p>
								<p>Активных эпизодов: <span>999999999</span></p>
								<p>Последний визит: <span>00/00/0000</span></p>
								<p>Последнее сообщение: <span>00/00/0000</span></p>
							</div>
						</div>
					</div>

				</div>
			</div>
				: 'Загрузка данных...'
			}



		</div>
	)
}

export default Profile