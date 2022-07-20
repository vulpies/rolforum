import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { commonFetch, commonPostReq, commonPostReqThen } from '../../helpers/commonFetch'
import Breadcrumbs from '../breadcrumbs'
import { FcApproval } from "react-icons/fc";
import { useTranslation } from "react-i18next";
import { useCallback } from 'react'
import Loading from '../../helpers/loading';
import { DeleteMsgBtn, EditMsgBtn, ModerEditMsgBtn } from '../../helpers/editOrRemove';
import { SwallError } from '../../helpers/swall_notifications';
import TextArea from '../TextArea';

const SingleApp = () => {
	const { t } = useTranslation();
	const { appId } = useParams()
	const navigate = useNavigate()

	const [appData, setAppData] = useState('')
	const [text, setText] = useState('')
	const [comments, setComments] = useState([])
	const [newMsg, setNewMsg] = useState(false)

	const searchUrl = window.location.search

	useEffect(() => {
		commonFetch(`https://api.postscriptum.games/v1/character-application-view/${appId}`, updMsgs)
	}, [appId])

	const updMsgs = useCallback((param) => {
		console.log(param, 'paramparam')
		setAppData(param)
		setComments(param.comments)
		setNewMsg(!newMsg)
	}, [newMsg])

	const newCom = (res) => {
		setComments([...comments, res.data.comment[0]])
		setNewMsg(!newMsg)
	}

	const handleClear = () => {
		setText('')
	}

	const sendPost = () => {
		const newComment = {
			application_id: appData.id,
			content: text
		}

		if (text !== '') {
			commonPostReqThen('https://api.postscriptum.games/v1/profile/character-app-comment-post', newComment, newCom)
			handleClear()
		} else {
			SwallError(t("components.singleApp.empty_message"))
		}
	}

	const onKeyDown = event => {
		if ((event.keyCode === 13) && (event.ctrlKey)) {
			sendPost()
		}
	}

	function approveApp() {
		commonPostReq('https://api.postscriptum.games/v1/moderate/character-approve',
			{
				"id": appData.id
			})
		navigate(`/characters/${appData.id}`)
	}

	const deleteCom = appData?.show_delete_button ? <DeleteMsgBtn className='sepi-header-desc__items-trash' /> : ''

	const userEdit = appData?.user_name === localStorage.getItem('username') ? <EditMsgBtn className='sepi-header-desc__items-trash' /> : ''

	const moderEdit = appData?.show_edit_button ? <ModerEditMsgBtn className='sepi-header-desc__items-edit moder-edit-btn' /> : ''


	return (
		<div className='wrapper'>


			<div className='sepi-bread-header extra'>
				<Breadcrumbs name={appData?.name} link={!searchUrl ? '/char_app' : '/characters'} extraName={!searchUrl ? t("pages.moder_page.applications") : t("components.characters.all_characters")} />
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
						{appData?.show_approve_button ? <button className='btns btns-approve' onClick={approveApp}><FcApproval /> Approve</button> : ''}

						<div className='char-app-edit__user'>{deleteCom} {userEdit} {moderEdit}</div>
					</div>

					{appData?.comments.length !== 0 && appData?.show_comments ?
						<>
							<div className='char-app__comments'>
								<p>{t("components.singleApp.comments")}</p>
							</div>

							<div className='char-app__comments-wrapper'>
								{appData && comments?.map(item => {

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
													__html: `${item.content?.replace(/\n/g, `</br>`).replace(/\s-\s/gm, ' — ')}`
												}} />

												{item.user_name === localStorage.getItem('username') ? <div className='char-app__edits'>
													{deleteCom} {userEdit}
												</div> : ''}

											</div>
										</div>
									</div>

								})}
							</div>

						</> : ''}

					<TextArea
						className='char-app__send-form'
						editorLine='editor-line'
						param={text}
						setParam={setText}
						id='single_app'
						areaClassName='send-post-form__text'
						value={text}
						onKeyDown={onKeyDown}
						onChange={(e) => setText(e.target.value)}
						sendBtn={sendPost} removeBtn={handleClear}
					/>

				</div> : <Loading />
			}


		</div>
	)
}

export default SingleApp