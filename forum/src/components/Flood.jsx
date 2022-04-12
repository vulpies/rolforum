import React from 'react'
import { useState } from 'react';
import SendOrRemove from './buttons/send_or_remove';

const Flood = () => {
	const [text, setText] = useState('')
	const [socket_con, setSocket] = useState(null)

	const floodData = {
		text,
		token: localStorage.getItem('token')
	}


	function startChat() {
		const socket = new WebSocket("wss://5r9ld0bvs5.execute-api.us-east-1.amazonaws.com/Prod")

		socket.onopen = function () {
			alert("[open] Connection established");
			socket.send(JSON.stringify({ action: "sendmessage", data: {updateToken: true, token: localStorage.getItem('token') } }));
		};

		socket.onmessage = function (event) {
			const data = JSON.parse(event.data);
			console.log(data, 'data')

			if (!data.tokenUpdate) {

				document.getElementById('message-area').innerHTML += '<div className="message">' +
					'<div className="message-header">' +
					'<span className="user"><a href="#' + data.user_id + '">' + data.user_name + '</a></span>' +
					'<span className="time">' + data.time + '</span>' +
					'</div>' +
					'<div className="content">' + data.content + '</div>' +
					'</div>';
			}
		}


		socket.onclose = function (event) {
			if (event.wasClean) {
				alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
			} else {
				alert('[close] Connection died');
			}
		};

		socket.onerror = function (error) {
			alert(`[error] ${error.message}`);
		};
		setSocket(socket)
	}

	function sendMessage() {
		// console.log(text, '7777')
		// console.log(document.getElementById('message').value, '5555')
		socket_con.send(JSON.stringify({ action: "sendmessage", data: floodData }));
		setText('')
	}

	return (<>
		<hr />
		<p className='flood-title'>Приветствуем в чате!</p>
		<hr />

		<button className='btns btns-log' id='start-chat' onClick={startChat}>Начать</button>

		<div id="message-area" className='flood-rcvd-msg'></div>

		<div className='flood-wrapper__send'>
			<textarea id="message"
				value={text}
				onChange={(e) => setText(e.target.value)}
				className='flood-wrapper__send-msg'></textarea>

			<SendOrRemove sendBtn={sendMessage} removeBtn={() => setText('')} />

		</div>
	</>
	)
}

export default Flood