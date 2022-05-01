import React from 'react'
import { BsPencilSquare } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import Breadcrumbs from '../components/breadcrumbs'

const Profile = () => {
	const [user] = useSelector((state) => state.usersReducer.user)
	console.log(user)


	return (
		<div className='wrapper'>
			<div className='epi-links single-link'>
				<Breadcrumbs name="Профиль" />
			</div>

			{user ? <div className='profile-wrapper'>
				<div className='profile-wrapper__mobile'>
					<div className='profile-top'>
						<p className='profile-name'>Профиль: <span>{user?.user_name}</span></p>
						<button className='btns profile-edit'><BsPencilSquare /></button>
					</div>

					<div className='profile-avatar'>
						<img src={user?.user_avatar} className='profile-avatar-img' alt='' />

						{user?.characters ? user?.characters.map((c) =>
							<div className='profile-chars'>
								<p>Доступные персонажи:</p>
								<div className='profile-chars-list'>
									<img src={c.avatar} key={c.id} alt={c.name} className='profile-chars-img' />
								</div>
							</div>)
							: 'Нет ни одного игрового персонажа'}
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
						<p className='profile-name'>Профиль: <span>{user?.user_name}</span></p>
						<button className='btns profile-edit'><BsPencilSquare /></button>
					</div>

					<div className='profile-wrapper__common'>

						<div className='profile-wrapper__common-left'>
							<div className='profile-avatar'>
								<img src={user?.user_avatar} className='profile-avatar-img' alt='' />

								{user?.characters ? user?.characters.map((c) =>
									<div className='profile-chars'>
										<p>Доступные персонажи:</p>
										<div className='profile-chars-list'>
											<img src={c.avatar} key={c.id} alt={c.name} className='profile-chars-img' />
										</div>
									</div>)
									: 'Нет ни одного игрового персонажа'}
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