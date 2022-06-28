import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import mainPic from '../images/pic.jpg'

const Slider = () => {
	const user = useSelector((state) => state.usersReducer)
	const [userInfo] = useSelector((state) => state.usersReducer.user)

	const [image, setImage] = useState("http://playmap.ru/uploads/fotos/foto_17000.gif")

	const changeImage = (e) => {
		const target = e.target
		setImage(target.src)
	}

	console.log(userInfo, 'userInfo')

	return (<>
		<p className='slider-title'>Привет, <span>{userInfo?.user_name || 'гость'}</span>!</p>

		{user && user.auth !== false ? <div className="slider">

			<div className='slider-main'>
				{userInfo?.current_character?.avatar ?
					<img src={userInfo?.user_avatar} alt='' className='slider-main__image' />
					: <img src={mainPic} alt='' className='slider-main__image' />}
			</div>
			<div className='slider-others'>
				{userInfo && userInfo.characters.length !== 0 ?
					<p>имеющиеся персонажи:</p>
					: <p>игровые персонажи отсутствуют</p>
				}
				{userInfo && userInfo.characters.map((item => {
					return <img key={item.id} src={item.avatar} alt={item.name} className='slider-others__image' onClick={changeImage} />
				}))}
			</div>
		</div> : ""
		}
	</>
	)
}

export default Slider