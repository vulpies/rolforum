import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTranslation } from "react-i18next";
import { commonPostReq } from '../../helpers/commonFetch'
import { SwallError } from '../../helpers/swall_notifications'
import TextArea from '../TextArea'
import { useCreateNewPostMutation } from '../../store/apiSlice';

const EpiSendPostFrom = () => {
	const { t } = useTranslation();
	const [user] = useSelector((state) => state.usersReducer.user)
	const [text, setText] = useState('')
	const location = useLocation()

	const [createNewPost] = useCreateNewPostMutation()

	const handleClear = () => {
		setText('')
	}

	const sendPost = () => {
		if (text !== '') {
			createNewPost({
				episode_id: location.pathname.slice(10),
				content: text
			}).unwrap()

			// commonPostReq('https://api.postscriptum.games/v1/post-create', {
			// 	episode_id: location.pathname.slice(10),
			// 	content: text
			// }, data => {
			// 	setText('')
			// 	updatePosts(data)
			// })
			setText('')

		} else {
			SwallError(t("components.epiSendPostForm.empty_message"))
		}
	}

	return (

		<TextArea
			className='send-post-form'
			name={user?.current_character?.name}
			editorLine='editor-line'
			param={text}
			setParam={setText}
			id='epi_textarea'
			areaClassName='send-post-form__text'
			value={text}
			onChange={(e) => setText(e.target.value)}
			sendBtn={sendPost}
			removeBtn={handleClear}
		/>
	)
}

export default EpiSendPostFrom