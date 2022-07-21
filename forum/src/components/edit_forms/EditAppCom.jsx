import React, { useState } from 'react'
import Breadcrumbs from '../breadcrumbs'
import TextArea from '../TextArea'

const EditAppCom = () => {
	const [update, setUpdate] = useState()

	return (
		<div className='wrapper'>EditAppCom

			<div className='sepi-bread-header extra'>
				<Breadcrumbs name='Редактирование сообщения' link='' extraName='Назад' />
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
				// sendBtn={editMsg}
				removeBtn={() => setUpdate('')}
			/>

		</div>
	)
}

export default EditAppCom