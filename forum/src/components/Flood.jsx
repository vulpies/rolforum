import React, { useEffect, useState, useCallback } from 'react'
import { AiOutlineSetting } from "react-icons/ai";
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { commonFetch } from '../helpers/commonFetch';
import Breadcrumbs from './breadcrumbs';
import SendOrRemove from './buttons/send_or_remove';

const Flood = () => {
	const [user] = useSelector((state) => state.usersReducer.user)
	const [text, setText] = useState('')
	const [socket_con, setSocket] = useState(null)
	const [msg, setMsg] = useState([])
	const [count, setCount] = useState(40)
	const [isHide, setHide] = useState(true)


	function updMsgs(param) {
		param.forEach(p => p["isHide"] = true)
		setMsg(param)
	}

	const url = 'https://api.rolecrossways.com/v1/chat-message-list';
	useEffect(() => {
		commonFetch(url, updMsgs)
	}, [setMsg, url])

	const addMsg = useCallback((data) => {
		if (!data.tokenUpdate) {
			data.isHide = true
			setMsg((msg) => [...msg, data]);
			// console.log(msg, '333')
		}
	}, []);

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
			Swal.fire({
				width: 350,
				position: 'top',
				icon: 'error',
				text: 'Нельзя отправить пустое сообщение!',
			})
		}
	}

	function msgSet(id) {
		const msgId = msg.find(m => m.id === id)
		if (msgId.id === id) {
			msgId.isHide = !msgId.isHide
			setHide(prevState => !prevState)
		}
	}

	function getAllMsg(param) {
		param.forEach(p => p["isHide"] = true)
		setMsg((msg) => param.concat(msg));
	}

	async function loadHistory() {
		setCount(count => count + 40)
		const url = `https://api.rolecrossways.com/v1/chat-message-list?offset=${count}`
		commonFetch(url, getAllMsg)
	}

	return (
		<div className="wrapper">
			<div className='sepi-bread-header extra'>
				<Breadcrumbs name="Флуд" link='/outgame' extraName="Вне игры" />
			</div>
			<p className='flood-title'>Приветствуем в чате!</p>

			<div className='flood-load-history'>
				<button className='btns btns-load' onClick={loadHistory}>Загрузить еще</button>
			</div>

			<div id="message-area" className='flood-rcvd-msg'>
				{msg && msg.map((m, index) =>
					<>
						{m.user_name === user?.user_name ?
							<div className="flood-message flood-message-owner" key={index}>

								<div className="flood-message__profile flood-message__profile-owner" >
									<span className="user">
										<a href={`/profile/${m.user_id}`}>{m.user_name}</a></span>
									<div className="flood-message__profile-avatar">
										<img src={m.user_avatar} alt={m.user_name} />
									</div>
								</div>

								<div className="flood-message__text" >
									<div className="flood-message__top-line flood-message__top-line-owner">
										<span className="flood-message__text-time flood-message__text-time-owner">{m.time}</span>
										<div className='flood-message__edit-block'>
											<span className='flood-message__edit' onClick={() => msgSet(m.id)}>
												<AiOutlineSetting />
											</span>
											{m.isHide ? '' : <div className='flood-message__edit-options-owner flood-message__edit-options'>
												<p>Редактировать</p>
												<p>Цитировать</p>
												<p>Удалить</p>
											</div>}
										</div>
									</div>
									<div className='flood-message__text-content-owner flood-message__text-content' dangerouslySetInnerHTML={{
										__html: `${m.content.replace(/\n/g, `</br>`)}`
									}} />
								</div>

							</div>
							:
							<div className="flood-message" key={index}>

								<div className="flood-message__profile" >
									<span className="user">
										<a href={`/profile/${m.user_id}`}>{m.user_name}</a></span>
									<div className="flood-message__profile-avatar">
										<img src={m.user_avatar} alt={m.user_name} />
									</div>
								</div>

								<div className="flood-message__text">
									<div className="flood-message__top-line">
										<span className="flood-message__text-time">{m.time}</span>
										<div className='flood-message__edit-block'>
											<span className='flood-message__edit' id={m.id} onClick={() => msgSet(m.id)}><AiOutlineSetting /></span>
											{m.isHide ? '' : <div className='flood-message__edit-options'>
												<p>Цитировать</p>
											</div>}
										</div>
									</div>
									<div className='flood-message__text-content' dangerouslySetInnerHTML={{
										__html: `${m.content.replace(/\n/g, `</br>`)}`
									}} />
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