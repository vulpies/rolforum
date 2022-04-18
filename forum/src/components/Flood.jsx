import React, { useEffect, useState } from 'react'
import { AiOutlineSetting } from "react-icons/ai";
import { commonFetch } from '../helpers/commonFetch';
import Breadcrumbs from './breadcrumbs';
import SendOrRemove from './buttons/send_or_remove';

const Flood = () => {
	const [text, setText] = useState('')
	const [socket_con, setSocket] = useState(null)
	const [msg, setMsg] = useState('')

	const url = 'https://api.rolecrossways.com/v1/chat-message-list';
	useEffect(() => {
		commonFetch(url, setMsg)
	}, [setMsg, url])

	const floodData = {
		text,
		token: localStorage.getItem('token')
	}


	function startChat() {
		const socket = new WebSocket("wss://5r9ld0bvs5.execute-api.us-east-1.amazonaws.com/Prod")

		socket.onopen = function () {
			socket.send(JSON.stringify({ action: "sendmessage", data: { updateToken: true, token: localStorage.getItem('token') } }));
		};

		socket.onmessage = function (event) {
			const data = JSON.parse(event.data);
			console.log(data, 'data')

			if (!data.tokenUpdate) {

				setMsg([...msg, data])
				console.log(msg)

				// 	if (data.user_name === localStorage.getItem('username')) {
				// 		document.getElementById('message-area').innerHTML += `
				// <div class="flood-message-owner flood-message">

				// <div class="flood-message__profile-owner flood-message__profile" >
				// <span class="user">
				// <a href="#${data.user_id}">${data.user_name}</a></span>
				// </div>

				// <div class="flood-message__text" >
				// <span class="flood-message__text-time-owner flood-message__text-time">${data.time}</span>
				// <div class="flood-message__text-content-owner flood-message__text-content">${data.content}</div>
				// </div>
				// </div>`

				// 	} else {
				// 		document.getElementById('message-area').innerHTML += `
				// <div class="flood-message">

				// <div class="flood-message__profile" >
				// <span class="user">
				// <a href="#${data.user_id}">${data.user_name}</a></span>
				// </div>

				// <div class="flood-message__text" >
				// <span class="flood-message__text-time">${data.time}</span>
				// <div class="flood-message__text-content">${data.content}</div>
				// </div>

				// </div>`
				// 	}

			}
		}


		socket.onclose = function (event) {
			// if (event.wasClean) {
			// 	alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
			// } else {
			// 	alert('[close] Connection died');
			// }
		};

		socket.onerror = function (error) {
			alert(`[error] ${error.message}`);
		};
		setSocket(socket)
	}

	function sendMessage() {
		if (text.trim() !== '') {
			socket_con.send(JSON.stringify({ action: "sendmessage", data: floodData }));
			setText('')
		} else {
			alert('Пустое сообщение отправить нельзя ~ Упс!')
		}
	}

	return (
		<div className="wrapper">
			<div className='sepi-bread-header extra'>
				<Breadcrumbs name="Флуд" link='/outgame' extraName="Вне игры" />
			</div>
			<hr />
			<p className='flood-title'>Приветствуем в чате!</p>
			<hr />

			<button className='btns btns-log' id='start-chat' onClick={startChat}>Начать</button>

			<div id="message-area" className='flood-rcvd-msg'>
				{msg && msg.map((m, index) =>
					<>
						{m.user_name === localStorage.getItem('username') ?
							<div className="flood-message flood-message-owner" key={index}>

								<div className="flood-message__profile flood-message__profile-owner" >
									<span className="user">
										<a href={`#{m.user_id}`}>{m.user_name}</a></span>
									<div className="flood-message__profile-avatar">
										<img src={m.user_avatar} alt={m.user_name} />
									</div>
								</div>

								<div className="flood-message__text" >
									<div className="flood-message__top-line flood-message__top-line-owner">
										<span className="flood-message__text-time flood-message__text-time-owner">{m.time}</span>
										<span className='flood-message__edit' onClick={() => console.log(1111)}><AiOutlineSetting /></span>
									</div>
									<div className="flood-message__text-content flood-message__text-content-owner">{m.content}</div>
								</div>

							</div>
							:
							<div className="flood-message" key={index} >

								<div className="flood-message__profile" >
									<span className="user">
										<a href={`#{m.user_id}`}>{m.user_name}</a></span>
									<div className="flood-message__profile-avatar">
										<img src={m.user_avatar} alt={m.user_name} />
									</div>
								</div>

								<div className="flood-message__text" >
									<div className="flood-message__top-line">
										<span className="flood-message__text-time">{m.time}</span>
										<span className='flood-message__edit' onClick={() => console.log(1111)}><AiOutlineSetting /></span>
									</div>
									<div className="flood-message__text-content">{m.content}</div>
								</div>

							</div>
						}
					</>
				)}

			</div>

			<div className='flood-wrapper__send'>
				<p>Введите ваше сообщение</p>
				<textarea id="message"
					value={text}
					onChange={(e) => setText(e.target.value)}
					className='flood-wrapper__send-msg'></textarea>

				<SendOrRemove sendBtn={sendMessage} removeBtn={() => setText('')} />

			</div>
		</div>
	)
}

export default Flood