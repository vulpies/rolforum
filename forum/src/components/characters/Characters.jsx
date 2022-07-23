import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CommonBigBtn from '../../helpers/big_btn'
import { commonFetch } from '../../helpers/commonFetch'
import Breadcrumbs from '../breadcrumbs'
import { useTranslation } from "react-i18next";

const Characters = () => {
	const { t } = useTranslation();
	const [user] = useSelector((state) => state.usersReducer.user)
	const [info, setInfo] = useState()
	const navigate = useNavigate()


	useEffect(() => {
		commonFetch(`https://api.postscriptum.games/v1/profile/character-list/${user?.user_id}`, setInfo)
	}, [user])


	return (
		<div className='wrapper'>

			<div className='epi-links single-link'>
				<Breadcrumbs name={t("components.characters.all_characters")} />
			</div>

			<CommonBigBtn
				className="create-char-btn"
				classNameBtn='btns btns-create'
				onClick={() => navigate(`/create`)}
				name={t("components.characters.create_character")}
			/>

			<div className='chars-common'>

				{info?.characters ?
					(<>
						<div className="chars-active__title">
							<p>{t("components.characters.active_characters")}</p>
						</div>

						<div className="chars-active">

							{info?.characters?.map(char => {
								return <div className='chars-wrapper' key={char.id}>
									<div className='chars-card'>
										<div className='char__info'>
											<p>{char.name}</p>
											<img src={char.avatar} alt='' />
											<span>[{char.fandom_name}]</span>
										</div>
										<div className='char__stats'>
											<p><span>{t("components.characters.post_count")}</span> {char?.total_posts}</p>
											<p><span>{t("components.characters.last_post")}</span><br /> {char?.last_post ? char?.last_post : t("components.characters.no_last_post")}</p>
										</div>
										<button className='btns btns-char' onClick={() => navigate(`/characters/${char.id}`)}>{t("components.characters.open")}</button>
									</div>
								</div>
							})}
						</div>
					</>) : ''
				}

				{info?.applications ?
					<>
						<div className="chars-pending__title">
							<p>{t("components.characters.waiting for approve")}</p>
						</div>

						<div className="chars-pending">
							{info?.applications.map(app => {
								return <div className='chars-pending__wrapper' key={app.id}>
									<a href={`/char_app/${app.id}?bc=1`}><span>[{app.fandom_name}]</span> {app.character_name}</a>
									<p>{t("components.characters.created_at")} {app.created_at.slice(0, 10)}</p>
								</div>
							})}

						</div>
					</> : ''

				}
			</div>
		</div>
	)
}

export default Characters