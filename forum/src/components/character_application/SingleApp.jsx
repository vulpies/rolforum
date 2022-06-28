import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { commonFetch } from '../../helpers/commonFetch'
import EditOrRemove from '../../helpers/editOrRemove'
import Breadcrumbs from '../breadcrumbs'
import { FcApproval } from "react-icons/fc";
import Editors from '../../helpers/editors'

const SingleApp = () => {
	const { appId } = useParams()
	const [appData, setAppData] = useState('')
	const [text, setText] = useState('')

	useEffect(() => {
		commonFetch(`https://api.postscriptum.games/v1/character-application-view/${appId}`, setAppData)
	}, [setAppData])

	console.log(appData, 'appData')

	return (
		<div className='wrapper'>

			<div className='sepi-bread-header extra'>
				<Breadcrumbs name={appData?.name} link='/char_app' extraName="Анкеты" />
			</div>

			{appData ?
				<div className='char-app__common-wrapper'>
					<div className='char-app__header'>
						<p className='char-app__header-date'>{appData?.created_at}</p>
					</div>

					<div className='char-app__wrapper'>
						<div className='char-app__name'>
							{appData?.fandom_name ? <span>[{appData?.fandom_name}]</span> : ''}
							<p>{appData?.name}</p>
						</div>

						<div className='char-app__avatar'>
							<img src={appData?.avatar} className='profile-avatar-img' alt='' />
						</div>

						<div className='create-char-desc' dangerouslySetInnerHTML={{
							__html: `${appData?.description}`
						}} />
					</div>

					<div className='char-app-edit__btns'>
						{appData?.show_approve_button ? <button className='btns btns-approve'><FcApproval /> Approve</button> : ''}

						<div className='char-app-edit__user'><EditOrRemove /></div>
					</div>

					{appData?.comments.length !== 0 && appData?.show_comments ?
						<>
							<div className='char-app__comments'>
								<p>Комментарии:</p>
							</div>

							<div className='char-app__comments-wrapper'>
								{appData?.comments?.map(item => {

									return <div className='char-app__message' key={item.id}>

										<div className='char-app__profile' >
											<span className="user">
												<a href={`/profile/${item.user_id}`}>{item.user_name}</a></span>
											<div className="char-app__profile-avatar">
												<img src={item.user_avatar} alt={item.user_name} />
											</div>
										</div>

										<div className="char-app__text">
											<div className='char-app__top-line'>
												<span className='char-app__text-time'>{item.created_at}</span>

												<div className='char-app__text-content' dangerouslySetInnerHTML={{
													__html: `${item.content?.replace(/\n/g, `</br>`)}`
												}} />
											</div>
										</div>
									</div>

								})}
							</div>

						</> : ''}

					<div className='char-app__send-form'>
						<p>Введите ваше сообщение</p>

						<Editors className='editor-line' param={text} setParam={setText} id='epi_textarea' />

						<textarea id='epi_textarea' className='send-post-form__text' value={text.trim()} onChange={(e) => setText(e.target.value)}></textarea>
					</div>
				</div> :
				<p style={{ textAlign: 'center' }}>Загрузка данных...</p>
			}


		</div>
	)
}

export default SingleApp