import axios from 'axios'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import SendOrRemove from '../buttons/send_or_remove'
import Swal from 'sweetalert2'
import TextEditor from '../text_editor/TextEditor'

const EpiSendPostFrom = ({ updatePosts }) => {
	const [text, setText] = useState('')
	const location = useLocation()

	const handleClear = () => {
		setText('')
	}

	let options = {}

	if (localStorage.getItem('token')) {
		options = {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		}
	}


	const sendPost = () => {
		if (text !== '') {
			axios.post('https://api.postscriptum.games/v1/post-create', {
				episode_id: location.pathname.slice(10),
				content: text
			}, options)
				.then(data => {
					console.log(data.data, 'data')
					setText('')
					updatePosts(data.data)
				})
			setText('')
		} else {
			Swal.fire({
				width: 350,
				position: 'top',
				icon: 'error',
				text: 'Нельзя отправить пустое сообщение!'
			})
		}
	}

	return (
		<div className='send-post-form'>
			<p>Введите ваше сообщение</p>

			<TextEditor />
			{/* <textarea className='send-post-form__text' value={text} onChange={(e) => setText(e.target.value)}></textarea> */}

			<SendOrRemove sendBtn={sendPost} removeBtn={handleClear} />

		</div>
	)
}

export default EpiSendPostFrom