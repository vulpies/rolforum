import React, { useState } from 'react'
import { BsPlusSquare } from 'react-icons/bs'
import { useSelector } from 'react-redux'

const Slider = () => {
	const user = useSelector((state) => state.usersReducer)
	const [userInfo] = useSelector((state) => state.usersReducer.user)

	const [image, setImage] = useState("http://forumavatars.ru/img/avatars/001b/2f/0f/461-1646910378.png")

	const changeImage = (e) => {
		const target = e.target
		setImage(target.src)
	}

	return (<>
		<p className='slider-title'>Привет, <span>{userInfo?.user_name || 'гость'}</span>!</p>

		{user.auth !== false ? <div className="slider">

			<div className='slider-main'>
				<img src={userInfo?.user_avatar} alt='' className='slider-main__image' />
			</div>
			{userInfo?.current_character.avatar ? <div className='slider-others'>
				<p>имеющиеся персонажи:</p>
				{userInfo && userInfo.characters.map((item => {
					return <img key={item._id} src={item.avatar} id={item._id} name={item.name} alt={item.name} className='slider-others__image' onClick={changeImage} />
				}))}
			</div> : "Загрузка данных..."}
		</div> : ""
		}
	</>
	)
}

export default Slider