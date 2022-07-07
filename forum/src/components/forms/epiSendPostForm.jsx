import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import SendOrRemove from '../buttons/send_or_remove'
import Swal from 'sweetalert2'
import Editors from '../../helpers/editors'
import { useSelector } from 'react-redux'
import { useTranslation } from "react-i18next";
import { commonPostReqThen } from '../../helpers/commonFetch'

const EpiSendPostFrom = ({ updatePosts }) => {
	const { t } = useTranslation();
	const [user] = useSelector((state) => state.usersReducer.user)
	const [text, setText] = useState('')
	const location = useLocation()

	const handleClear = () => {
		setText('')
	}

	const sendPost = () => {
		if (text !== '') {
			commonPostReqThen('https://api.postscriptum.games/v1/post-create', {
				episode_id: location.pathname.slice(10),
				content: text
			}, data => {
				setText('')
				updatePosts(data.data)
			})
			setText('')

		} else {
			Swal.fire({
				width: 350,
				position: 'top',
				icon: 'error',
				text: t("components.epiSendPostForm.empty_message")
			})
		}
	}

	return (
		<div className='send-post-form'>
			<p><b>{user?.current_character?.name}</b>, {t("components.epiSendPostForm.type_message")}</p>

			<Editors className='editor-line' param={text} setParam={setText} id='epi_textarea' />

			<textarea id='epi_textarea' className='send-post-form__text' value={text} onChange={(e) => setText(e.target.value)}></textarea>

			<SendOrRemove sendBtn={sendPost} removeBtn={handleClear} />
		</div>
	)
}

export default EpiSendPostFrom