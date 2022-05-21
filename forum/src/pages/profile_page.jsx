import React from 'react'
import { BsPencilSquare, BsChatText } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Breadcrumbs from '../components/breadcrumbs'

const Profile = () => {
	const [user] = useSelector((state) => state.usersReducer.user)
	const navigate = useNavigate()

	return (
		<div className='wrapper'>
			<div className='epi-links single-link'>
				<Breadcrumbs name="Профиль" />
			</div>

			{user ?
				<div className='profile-wrapper'>
					<div className='profile-wrapper__mobile'>
						<div className='profile-top'>
							<p className='profile-name'>Профиль: <span>{user?.user_name}</span></p>
							{user?.user_name === localStorage.getItem('username') ?

								<button className='btns profile-edit' onClick={() => navigate(`/profile/${user?.user_id}/edit`)}>
									<BsPencilSquare />
								</button>
								: ''}
							<button className='btns profile-chat'><BsChatText /></button>
						</div>

						<div className='profile-avatar'>
							<img src={user?.user_avatar} className='profile-avatar-img' alt='' />
							<div className='profile-chars'>
								<p>Доступные персонажи:</p>
								<div className='profile-chars-list'>
									{user?.characters?.length !== 0 ? user?.characters?.map(c =>
										<img src={c.avatar} key={c.id} alt={c.name} className='profile-chars-img' />
									) : 'На текущий момент нет'}

								</div>
							</div>

						</div>

						<div className='profile-common__info'>
							<p>Зарегистрирован: <span>{user?.registered_at?.split(' ')[0]}</span></p>
							<p>Репутация: <span>999999999</span></p>
							<p>Активных эпизодов: <span>999999999</span></p>
							<p>Игровых постов: <span>{user?.post_count ?? 0}</span></p>
							<p>Пост был написан: <br /><span>{user?.last_post ? user?.last_post : 'пока что не был...'}</span></p>
							<p>Последний визит: <br /><span>{user?.last_page_load_at}</span></p>
							<p>Последняя активность: <br /><span>{user?.last_activity_at}</span></p>
						</div>

					</div>

					<div className='profile-wrapper__tabdesk'>
						<div className='profile-top'>
							<p className='profile-name'>Профиль: <span>{user?.user_name}</span></p>
							{user?.user_name === localStorage.getItem('username') ?
								<button className='btns profile-edit' onClick={() => navigate(`/profile/${user?.user_id}/edit`)}>
									<BsPencilSquare />
								</button>
								: ''}
							<button className='btns profile-chat'><BsChatText /></button>
						</div>

						<div className='profile-wrapper__common'>

							<div className='profile-wrapper__common-left'>
								<div className='profile-avatar'>
									<img src={user?.user_avatar} className='profile-avatar-img' alt='' />

									<div className='profile-chars'>
										<p>Доступные персонажи:</p>
										<div className='profile-chars-list'>
											{user?.characters?.length !== 0 ? user?.characters?.map(c =>
												<img src={c.avatar} key={c.id} alt={c.name} className='profile-chars-img' />
											) : 'На текущий момент нет'}

										</div>
									</div>
								</div>
							</div>

							<div className='profile-wrapper__common-right'>
								<div className='profile-common__info'>
									<p>Зарегистрирован: <span>{user?.registered_at?.split(' ')[0]}</span></p>
									<p>Репутация: <span>999999999</span></p>
									<p>Активных эпизодов: <span>999999999</span></p>
									<p>Игровых постов: <span>{user?.post_count ?? 0}</span></p>
									<p>Пост был написан: <span>{user?.last_post ? user?.last_post : 'пока что не был...'}</span></p>
									<p>Последний визит: <span>{user?.last_page_load_at}</span></p>
									<p>Последняя активность: <span>{user?.last_activity_at}</span></p>
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