import React from 'react'
import { useEffect, useState } from 'react'
import { BsPencil, BsChatText } from 'react-icons/bs'
import { useParams, useNavigate } from 'react-router-dom'
import Breadcrumbs from '../components/breadcrumbs'
import { commonFetch } from '../helpers/commonFetch'

const Profile = () => {
	const navigate = useNavigate()

	const search = useParams();
	const [info, setInfo] = useState([])

	useEffect(() => {
		commonFetch(`https://api.postscriptum.games/v1/profile/view/${search.profId}`, setInfo)
	}, [setInfo, search.profId])


	console.log(info, 8888)

	return (
		<div className='wrapper'>
			<div className='epi-links single-link'>
				<Breadcrumbs name="Профиль" />
			</div>

			{info ?
				<div className='profile-wrapper'>
					<div className='profile-wrapper__mobile'>
						<div className='profile-top'>
							<p className='profile-name'>Профиль: <span>{info?.user_name}</span></p>
							{info?.user_name === localStorage.getItem('username') ?

								<button className='btns profile-edit' onClick={() => navigate(`/profile/${info?.user_id}/edit`)}>
									<BsPencil />
								</button>
								: ''}
							<button className='btns profile-chat'><BsChatText /></button>
						</div>

						<div className='profile-avatar'>
							<img src={info?.user_avatar} className='profile-avatar-img' alt='' />
							<div className='profile-chars'>
								{info?.characters ?
									<>
										<p>Доступные персонажи:</p>
										<div className='profile-chars-list'>

											{info?.characters?.length !== 0 ? info?.characters?.map(c =>
												<img src={c.avatar} key={c.id} alt={c.name} onClick={() => navigate(`/my_chars/${c.id}`)} className='profile-chars-img' />
											) : 'На текущий момент нет'}

										</div>
									</> : <p>Нет ни одного персонажа</p>}

							</div>

						</div>

						<div className='profile-common__info'>
							<p>Зарегистрирован: <span>{info?.registered_at?.split(' ')[0]}</span></p>
							<p>Репутация: <span>999999999</span></p>
							<p>Активных эпизодов: <span>999999999</span></p>
							<p>Игровых постов: <span>{info?.post_count ?? 0}</span></p>
							<p>Пост был написан: <br /><span>{info?.last_post ? info?.last_post : 'пока что не был...'}</span></p>
							<p>Последний визит: <br /><span>{info?.last_page_load_at}</span></p>
							<p>Последняя активность: <br /><span>{info?.last_activity_at}</span></p>
						</div>

					</div>

					<div className='profile-wrapper__tabdesk'>
						<div className='profile-top'>
							<p className='profile-name'>Профиль: <span>{info?.user_name}</span></p>
							{info?.user_name === localStorage.getItem('username') ?
								<button className='btns profile-edit' onClick={() => navigate(`/profile/${info?.user_id}/edit`)}>
									<BsPencil />
								</button>
								: ''}
							<button className='btns profile-chat'><BsChatText /></button>
						</div>

						<div className='profile-wrapper__common'>

							<div className='profile-wrapper__common-left'>
								<div className='profile-avatar'>
									<img src={info?.user_avatar} className='profile-avatar-img' alt='' />

									<div className='profile-chars'>
										<p>Доступные персонажи:</p>
										<div className='profile-chars-list'>
											{info?.characters?.length !== 0 ? info?.characters?.map(c =>
												<img src={c.avatar} key={c.id} alt={c.name} onClick={() => navigate(`/my_chars/${c.id}`)} className='profile-chars-img' />
											) : 'На текущий момент нет'}

										</div>
									</div>
								</div>
							</div>

							<div className='profile-wrapper__common-right'>
								<div className='profile-common__info'>
									<p>Зарегистрирован: <span>{info?.registered_at?.split(' ')[0]}</span></p>
									<p>Репутация: <span>999999999</span></p>
									<p>Активных эпизодов: <span>999999999</span></p>
									<p>Игровых постов: <span>{info?.post_count ?? 0}</span></p>
									<p>Пост был написан: <span>{info?.last_post ? info?.last_post : 'пока что не был...'}</span></p>
									<p>Последний визит: <span>{info?.last_page_load_at}</span></p>
									<p>Последняя активность: <span>{info?.last_activity_at}</span></p>
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