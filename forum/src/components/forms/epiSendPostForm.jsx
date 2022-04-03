import React, { useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import SendOrRemove from '../buttons/send_or_remove'

const EpiSendPostFrom = () => {
	const [text, setText] = useState('')
	const location = useLocation()
	// const navigate = useNavigate()

	const handleClear = () => {
		setText('')
	}

	const sendPost = () => {
		axios.post('https://api.rolecrossways.com/v1/post-create', {
			episode_id: location.pathname.slice(10),
			content: text
		})

		console.log(location.pathname.slice(10), text)
		// navigate('/episode/')

	}

	return (
		<div className='send-post-form'>
			<textarea className='send-post-form__text' value={text} onChange={(e) => setText(e.target.value)}></textarea>

			<SendOrRemove sendBtn={sendPost} removeBtn={handleClear} />

		</div>
	)
}

export default EpiSendPostFrom