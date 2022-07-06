import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import mainPic from '../images/pic.jpg'
import { commonFetch, uploadInfoFetch } from '../helpers/commonFetch'
import {useTranslation} from "react-i18next";

const Slider = () => {
	const { t } = useTranslation();
	const user = useSelector((state) => state.usersReducer)
	const [userInfo] = useSelector((state) => state.usersReducer.user)
	const [activeChar, setActiveChar] = useState('')
	const [upd, setUpd] = useState(false)
	const [abc, setAbc] = useState('')
	// const [smth, setSmth] = useState(false)
	// const current = userInfo?.current_character

	useEffect(() => {
		if (userInfo) {
			setActiveChar(userInfo.current_character)
		}
	}, [userInfo])


	useEffect(() => {

	}, [upd])

	// const newActive = Object.assign(activeChar)
	// console.log(Object.isExtensible(newActive), 99999)
	//console.log(abc, 666666666)

	// console.log(current, 'currentcurrent')
	// console.log(userInfo, 'userInfouserInfouserInfo')
	// console.log(activeChar, 'activeCharactiveCharactiveChar')

	function changeChar(id) {
		//console.log(id)
		uploadInfoFetch(`https://api.postscriptum.games/v1/profile/character/set-current/${id}/`)

		//console.log(11111)
		setUpd(true)
		//console.log(upd, 77777)

		commonFetch(`https://api.postscriptum.games/v1/me`, setAbc)
	}

	const allChars = userInfo?.characters?.filter(item => item.id !== activeChar.id)

	return (<>
		<p className='slider-title'>{t("components.slider.hello")} <span>{userInfo?.user_name || t("components.slider.guest")}</span>!</p>

		{user && user.auth !== false ? <div className="slider">

			<div className='slider-main'>
				{userInfo ?
					<a href={`/profile/${userInfo?.user_id}`}>
						<img src={userInfo?.user_avatar} alt='' className='slider-main__image' />
					</a>
					:
					<a href={`/profile/${userInfo?.user_id}`}>
						<img src={mainPic} alt='' className='slider-main__image' />
					</a>}
			</div>

			<div className='slider-others'>
				{userInfo && userInfo.characters.length !== 0 ?
					<p>{t("components.slider.your_characters")}</p>
					: <p>{t("components.slider.no_characters")}</p>
				}

				{userInfo && activeChar ? <img key={activeChar.id} src={activeChar.avatar} className='slider-others__image slider-active-char' alt={activeChar.name} /> : 'нет актива'}

				{userInfo && allChars.map((item => {
					return <img key={item?.id} src={item?.avatar} alt={item?.name} className='slider-others__image' onClick={() => changeChar(item?.id)} />
				}))}

			</div>
		</div> : ""
		}
	</>
	)
}

export default Slider