import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const Slider = () => {
	const user = useSelector((state) => state.usersReducer)
	const userInfo = useSelector((state) => state.usersReducer.user[0])

	console.log(user, 'user')
	console.log(userInfo, 'userInfo')


	const [image, setImage] = useState("http://forumavatars.ru/img/avatars/001b/2f/0f/461-1646910378.png")

	const changeImage = (e) => {
		const target = e.target
		setImage(target.src)
	}


	return (<>
		<p className='slider-title'>Привет, <span>{userInfo?.user_name || 'гость'}</span>!</p>

		{user.auth !== false ? <div className="slider">

			<div className='slider-main'>
				<img src={image} alt='' className='slider-main__image' />
			</div>
			{userInfo?.current_character.avatar ? <div className='slider-others'>
				{userInfo && userInfo.characters.map((item => {
					return <img src={item.avatar} id={item._id} key={item._id} name={item.name} alt={item.name} className='slider-others__image' onClick={changeImage} />
				}))}
			</div> : ""}
		</div> : ""
		}
	</>
	)
}

export default Slider