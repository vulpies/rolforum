import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { commonFetch, commonPostReq } from '../../helpers/commonFetch'
import Breadcrumbs from '../breadcrumbs'
import TextArea from '../TextArea'

const CommonEditTextForm = ({ postId, getInfo, text, sendUpdInfo, partOne, partTwo, id }) => {
	const [update, setUpdate] = useState()
	const [postInfo, setPostInfo] = useState()
	const navigate = useNavigate()

	useEffect(() => {
		commonFetch(`${getInfo}${postId}`, setPostInfo)
	}, [getInfo, postId])

	const editPost = () => {
		commonPostReq(`${sendUpdInfo}`, {
			[text]: postId,
			content: update
		})
		navigate(`/${partOne}/${postInfo?.[partTwo]}`)
	}

	return (
		<div className='wrapper'>

			<div className='sepi-bread-header extra'>
				<Breadcrumbs name='Редактирование сообщения' link={`/${partOne}/${postInfo?.[partTwo]}`} extraName='Назад' />
			</div>

			<TextArea
				className='send-post-form edit-msg'
				areaClassName='send-post-form__text'
				param={update}
				setParam={setUpdate}
				editorLine='editor-line'
				id={id}
				defaultValue={postInfo?.content}
				value={update}
				onChange={(e) => setUpdate(e.target.value)}
				sendBtn={editPost}
				removeBtn={() => setUpdate('')}
			/>

		</div>
	)
}

export default CommonEditTextForm