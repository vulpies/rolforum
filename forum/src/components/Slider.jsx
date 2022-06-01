import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const Slider = () => {
	const user = useSelector((state) => state.usersReducer)
	const [userInfo] = useSelector((state) => state.usersReducer.user)

	const [image, setImage] = useState("https://yt3.ggpht.com/a-/AAuE7mCUWAR_ZKWNCtfsIQbD811QDQFX0wC-5Fajmg=s400-mo-c-c0xffffffff-rj-k-no")

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
					: <img src={image} alt='' className='slider-main__image' />}
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