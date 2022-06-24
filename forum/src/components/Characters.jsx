import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CommonBigBtn from '../helpers/big_btn'
import Breadcrumbs from './breadcrumbs'

const Characters = () => {
	const [user] = useSelector((state) => state.usersReducer.user)
	const characters = user?.characters
	console.log(user, '0000')
	console.log(characters, '0000')

	const navigate = useNavigate()


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
					{characters ? characters.map(char => {
						return <div className='chars-wrapper' key={char.id}>
							<div className='chars-card'>
								<div className='char__info'>
									<p>{char.name}</p>
									<img src={char.avatar} alt='' />
									<span>[{char.fandom_name}]</span>
								</div>
								<div className='char__stats'>
									<p>Постов:</p>
									<p>Появлялся: 0000-00-00</p>
								</div>
								<button className='btns btns-char'>Открыть</button>
							</div>
						</div>
					}) : 'На данный момент нет'}
				</div>

				<div className="">
					<p className="">На стадии проверки:</p>
					{/* {characters ? <div>
						111
					</div> : 'На данный момент нет'} */}
				</div>

			</div>


		</div>
	)
}

export default Characters