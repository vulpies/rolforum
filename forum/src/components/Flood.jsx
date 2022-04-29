import React, { useEffect, useState, useCallback } from 'react'
import { AiOutlineSetting } from "react-icons/ai";
import { useSelector } from 'react-redux';
import { commonFetch } from '../helpers/commonFetch';
import Breadcrumbs from './breadcrumbs';
import SendOrRemove from './buttons/send_or_remove';

const Flood = () => {
	const user = useSelector((state) => state.usersReducer.user)
	const [text, setText] = useState('')
	const [socket_con, setSocket] = useState(null)
	const [msg, setMsg] = useState([])
	const [loadHis, setloadHis] = useState([])
	const [count, setCount] = useState(40)

	const url = 'https://api.rolecrossways.com/v1/chat-message-list';
	useEffect(() => {
		commonFetch(url, setMsg)
	}, [setMsg, url])

	const addMsg = useCallback((data) => {
		if (!data.tokenUpdate) {
			setMsg((msg) => [...msg, data]);
			console.log(msg, '333')
		}
	}, [msg]);

	const floodData = {
		text,
		token: localStorage.getItem('token')
	}

	const startChat = useCallback(() => {
		const socket = new WebSocket("wss://5r9ld0bvs5.execute-api.us-east-1.amazonaws.com/Prod")

		socket.onopen = function () {
			socket.send(JSON.stringify({ action: "sendmessage", data: { updateToken: true, token: localStorage.getItem('token') } }));
		};

		socket.onmessage = function (event) {
			const data = JSON.parse(event.data);
			console.log(data, 'data')

			addMsg(data)
		}


		socket.onclose = function (event) {
		};

		socket.onerror = function (error) {
			alert(`[error] ${error.message}`);
		};
		setSocket(socket)
	}, [setSocket])

	useEffect(() => {
		startChat()
	}, [startChat])

	function sendMessage() {
		if (text.trim() !== '') {
			socket_con.send(JSON.stringify({ action: "sendmessage", data: floodData }));
			setText('')
		} else {
			alert('Пустое сообщение отправить нельзя ~ Упс!')
		}
	}

	function msgSet(id) {
		if (id === user[0].user_id) {
			console.log(1111)
		} else {
			console.log(22222)
		}
	}


	function loadHistory() {
		setCount(count => count + 40)
		const url = `https://api.rolecrossways.com/v1/chat-message-list?offset=${count
			}`
		commonFetch(url, setloadHis)
		setMsg((msg) => [...loadHis, ...msg]);
	}


	return (
		<div className="wrapper">
			<div className='sepi-bread-header extra'>
				<Breadcrumbs name="Флуд" link='/outgame' extraName="Вне игры" />
			</div>
			<hr />
			<p className='flood-title'>Приветствуем в чате!</p>
			<hr />

			<div className='flood-load-history'>
				<button className='btns btns-load' onClick={loadHistory}>Загрузить еще</button>
			</div>

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
										<span className='flood-message__edit' onClick={() => msgSet(m.user_id)}><AiOutlineSetting /></span>
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
										<span className='flood-message__edit' onClick={() => msgSet(m.user_id)}><AiOutlineSetting /></span>
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

				{socket_con ? <SendOrRemove sendBtn={sendMessage} removeBtn={() => setText('')} /> : ""}

			</div>
		</div>
	)
}

export default Flood