import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { commonFetch } from '../../helpers/commonFetch'
import Breadcrumbs from '../breadcrumbs';
import { FcApproval } from "react-icons/fc";
import EditOrRemove from '../../helpers/editOrRemove';

const CharInfo = () => {
	const [char, setChar] = useState()
	const search = useParams();

	useEffect(() => {
		commonFetch(`https://api.postscriptum.games/v1/character-view/${search.charId}`, setChar)
	}, [setChar, search.charId])

	console.log(char, 'char')
	return (
		<div className='wrapper'>

			<div className='sepi-bread-header extra'>
				<Breadcrumbs name={char?.name} link='/characters' extraName="Все персонажи" />
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

						{char?.episodes.length !== 0 ? <div className='char-info__epies'><p>Эпизоды:</p>
							<ul className='char-info__epies-list'>
								{char?.episodes?.map(item => { return <li key={item.id}><a href={`/episodes/${item.id}`}>[{item.fandoms}] {item.name}</a></li> })}
							</ul>
						</div> : ""}



					</div>

					<div className='char-app-edit__btns char-info__btns'>
						<div className='char-app-edit__user'><EditOrRemove /></div>
					</div>

				</div> :
				<p style={{ textAlign: 'center' }}>Загрузка данных...</p>
			}


		</div >
	)
}

export default CharInfo