import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { commonPostReq } from '../helpers/commonFetch'
import Breadcrumbs from './breadcrumbs'
import TextArea from './TextArea'

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

			<TextArea
				className='send-post-form edit-msg'
				areaClassName='send-post-form__text'
				param={update}
				setParam={setUpdate}
				editorLine='editor-line'
				id='edit_msg'
				value={update}
				onChange={(e) => setUpdate(e.target.value)}
				sendBtn={editMsg}
				removeBtn={() => setUpdate('')}
			/>

		</div>
	)
}

export default EditMessage