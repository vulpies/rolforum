import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import mainPic from '../images/pic.jpg'
import { uploadInfoFetch } from '../helpers/commonFetch'
import { useTranslation } from "react-i18next";

const Slider = () => {
	const { t } = useTranslation();
	const user = useSelector((state) => state.usersReducer)
	const [userInfo] = useSelector((state) => state.usersReducer.user)
	const [activeChar, setActiveChar] = useState('')
	const [upd, setUpd] = useState(false)

	useEffect(() => {
		if (userInfo) {
			setActiveChar(userInfo.current_character)
		}
	}, [userInfo])


	useEffect(() => {
	}, [upd])

	function changeChar(id) {
		uploadInfoFetch(`https://api.postscriptum.games/v1/profile/character/set-current/${id}/`)

		const oneChar = userInfo?.characters?.filter(item => item.id === id)
		setActiveChar(oneChar[0])
		setUpd(!upd)
	}

	const allChars = userInfo?.characters?.filter(item => item.id !== activeChar.id)

	return (<>
		<p className='slider-title'>{t("components.slider.hello")} <span>{userInfo?.user_name || t("components.slider.guest")}</span>!</p>

		{user && user.auth !== false ? <div className="slider">

			<div className='slider-main'>
				<a href={`/profile/${userInfo?.user_id}`}>
					<img src={userInfo?.user_avatar ? userInfo?.user_avatar : mainPic} alt='' className='slider-main__image' />
				</a>
			</div>

			<div className='slider-others'>
				{userInfo && userInfo.characters.length !== 0 ?
					<p>{t("components.slider.your_characters")}</p>
					: <p>{t("components.slider.no_characters")}</p>
				}

				<div className='slider-others__dop'>
					{userInfo && activeChar ? <img key={activeChar.id} src={activeChar.avatar} className='slider-others__image slider-active-char' alt={activeChar.name} /> : 'нет актива'}

					{userInfo && allChars.map((item => {
						return <img key={item?.id} src={item?.avatar} alt={item?.name} className='slider-others__image' onClick={() => changeChar(item?.id)} />
					}))}
				</div>

			</div>
		</div> : ""
		}
	</>
	)
}

export default Slider