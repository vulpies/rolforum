import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { commonFetch, commonPostReq } from '../../helpers/commonFetch'
import Breadcrumbs from '../breadcrumbs'
import TextArea from '../TextArea'

const EditPost = () => {
	const [update, setUpdate] = useState()
	const postId = window.location.pathname.slice(15)
	const [postInfo, setPostInfo] = useState()
	const navigate = useNavigate()

	useEffect(() => {
		commonFetch(`https://api.postscriptum.games/v1/post-edit-data/${postId}`, setPostInfo)
	}, [setPostInfo, postId])

	console.log(postInfo)

	const editPost = () => {
		commonPostReq('https://api.postscriptum.games/v1/post-edit', {
			post_id: postId,
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