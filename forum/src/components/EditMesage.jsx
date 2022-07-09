import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { commonPostReq } from '../helpers/commonFetch'
import Editors from '../helpers/editors'
import Breadcrumbs from './breadcrumbs'
import SendOrRemove from './buttons/send_or_remove'

const EditMessage = ({ id, text, epiId }) => {
	const navigate = useNavigate()
	const [update, setUpdate] = useState(text)

	function editMsg() {
		commonPostReq('https://api.postscriptum.games/v1/post-update', {
			post_id: id,
			content: update
		})
		navigate(-1)
	}

	return (
		<div className='wrapper'>

			<div className='sepi-bread-header extra'>
				<Breadcrumbs name='Редактирование сообщения' link={`/episodes/${epiId}`} extraName='Назад' />
			</div>

			<div className='send-post-form edit-msg'>

				<Editors className='editor-line' param={update} setParam={setUpdate} id='epi_textarea' />

				<textarea id='epi_textarea' className='send-post-form__text' value={update} onChange={(e) => setUpdate(e.target.value)}></textarea>

				<SendOrRemove sendBtn={editMsg} removeBtn={() => setUpdate('')} />
			</div>

		</div>
	)
}

export default EditMessage