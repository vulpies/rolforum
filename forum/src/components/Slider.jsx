import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import mainPic from '../images/pic.jpg'
import { commonFetch, uploadInfoFetch } from '../helpers/commonFetch'

const Slider = () => {
	const user = useSelector((state) => state.usersReducer)
	const [userInfo] = useSelector((state) => state.usersReducer.user)
	// const [smth, setSmth] = useState(false)
	// const [activeChar, setActiveChar] = useState('')

	const current = userInfo?.current_character

	// useEffect(() => {

	// }, [smth])

	// const curChar = userInfo?.current_character
	console.log(current, 'currentcurrent')
	// console.log(userInfo, 'userInfouserInfouserInfo')

	function changeChar(id) {
		console.log(id)
		uploadInfoFetch(`https://api.postscriptum.games/v1/profile/character/set-current/${id}/`)

		// setSmth(true)
		// commonFetch(`https://api.postscriptum.games/v1/me`, setActiveChar)
		// console.log(activeChar.current_character, 'VRVUIRND')
	}

	const allChars = userInfo?.characters?.filter(item => item.id !== current.id)

	return (<>
		<p className='slider-title'>Привет, <span>{userInfo?.user_name || 'гость'}</span>!</p>

		{user && user.auth !== false ? <div className="slider">

			<div className='slider-main'>
				{userInfo ?
					<img src={userInfo?.user_avatar} alt='' className='slider-main__image' />
					: <img src={mainPic} alt='' className='slider-main__image' />}
			</div>
			<div className='slider-others'>
				{userInfo && userInfo.characters.length !== 0 ?
					<p>имеющиеся персонажи:</p>
					: <p>игровые персонажи отсутствуют</p>
				}
				{/* <div> */}
				{userInfo && current ? <img key={current.id} src={current.avatar} className='slider-others__image slider-active-char' alt={current.name} /> : 'нет актива'}

				{userInfo && allChars.map((item => {
					return <img key={item?.id} src={item?.avatar} alt={item?.name} className='slider-others__image' onClick={() => changeChar(item?.id)} />
				}))}
				{/* </div> */}

			</div>
		</div> : ""
		}
	</>
	)
}

export default Slider