import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { commonFetch } from '../../helpers/commonFetch'
import Breadcrumbs from '../breadcrumbs';
import { BsPencil } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import Loading from '../../helpers/loading';

const CharInfo = () => {
	const { t } = useTranslation();
	const [char, setChar] = useState()
	const search = useParams();

	useEffect(() => {
		commonFetch(`https://api.postscriptum.games/v1/character-view/${search.charId}`, setChar)
	}, [setChar, search.charId])


	console.log(char, 'char')
	return (
		<div className='wrapper'>

			<div className='sepi-bread-header extra'>
				<Breadcrumbs name={char?.name} link='/characters' extraName={t("components.charinfo.all_characters")} />
			</div>

			{char ?
				<div className='char-app__common-wrapper'>

					<div className='char-app__wrapper char-info__wrapper'>
						<div className='char-app__name'>
							<span>[{char?.fandom_name}]</span> <p>{char?.name}</p>
						</div>

						<div className='char-app__avatar'>
							<img src={char?.avatar_url} className='profile-avatar-img' alt='' />
						</div>

						<div className='create-char-desc' dangerouslySetInnerHTML={{
							__html: `${char?.description}`
						}} />

						<div className='char-info__user'>
							<p><span>{t("components.charinfo.player")}</span> <a href={`/profile/${char?.user_id}`}> {char?.user_name}</a></p>
						</div>

						{char?.episodes.length !== 0 ? <div className='char-info__epies'><p>{t("components.charinfo.episodes")}</p>
							<ul className='char-info__epies-list'>
								{char?.episodes?.map(item => { return <li key={item.id}><a href={`/episodes/${item.id}`}>[{item.fandoms}] {item.name}</a></li> })}
							</ul>
						</div> : ""}



					</div>

					<div className='char-app-edit__btns char-info__btns'>
						{char.user_name === localStorage.getItem('username') ? <span className='sepi-header-desc__items-edit'> <BsPencil /></span> : ''}
					</div>

				</div> : <Loading />
			}


		</div >
	)
}

export default CharInfo