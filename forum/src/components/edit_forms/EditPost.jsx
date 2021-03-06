import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { commonFetch, commonPostReq } from '../../helpers/commonFetch'
import Breadcrumbs from '../breadcrumbs'
import TextArea from '../TextArea'

const EditPost = () => {
	const [update, setUpdate] = useState()
	const { epiPostId } = useParams()
	const [postInfo, setPostInfo] = useState()
	const navigate = useNavigate()

	useEffect(() => {
		commonFetch(`https://api.postscriptum.games/v1/post-edit-data/${epiPostId}`, setPostInfo)
	}, [])

	const editPost = () => {
		commonPostReq('https://api.postscriptum.games/v1/post-edit', {
			post_id: epiPostId,
			content: update
		})
		navigate(`/episodes/${postInfo?.episode_id}`)
	}

	return (
		<div className='wrapper'>

			<div className='sepi-bread-header extra'>
				<Breadcrumbs name='Редактирование сообщения' link={`/episodes/${postInfo?.episode_id}`} extraName='Назад' />
			</div>

			<TextArea
				className='send-post-form edit-msg'
				areaClassName='send-post-form__text'
				param={update}
				setParam={setUpdate}
				editorLine='editor-line'
				id='edit_msg'
				defaultValue={postInfo?.content}
				value={update}
				onChange={(e) => setUpdate(e.target.value)}
				sendBtn={editPost}
				removeBtn={() => setUpdate('')}
			/>

		</div>
	)
}

export default EditPost