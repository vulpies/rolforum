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
	const wrapper = document.querySelector('.wrapper')


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

		// if (msgId.isHide === false && isHide === false) {
		// 	wrapper.addEventListener('click', () => {
		// 		msgId.isHide = !msgId.isHide
		// 		setHide(prevState => !prevState)
		// 	})
		// }
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

	function deleteMsg(id) {
		setMsg(msg.filter(item => item.id !== id))
		console.log(msg, 'msgmsgmsg')
	}

	const allMsg = msg?.map(m => {

		const owner = m.user_name === user?.user_name
		const message = owner ? 'flood-message flood-message-owner' : 'flood-message';
		const profile = owner ? 'flood-message__profile flood-message__profile-owner' : 'flood-message__profile';
		const topLine = owner ? 'flood-message__top-line flood-message__top-line-owner' : 'flood-message__top-line';
		const textTime = owner ? 'flood-message__text-time flood-message__text-time-owner' : 'flood-message__text-time';
		const textContent = owner ? 'flood-message__text-content-owner flood-message__text-content' : 'flood-message__text-content';

		const setBtn = owner ? <div className={'flood-message__edit-options-owner flood-message__edit-options'}>
			<p>Редактировать</p>
			<p>Цитировать</p>
			<p onClick={() => deleteMsg(m.id)}>Удалить</p>
		</div>
			: <div className='flood-message__edit-options'>
				<p>Цитировать</p>
			</div>

		return (
			<div className={message} key={m.id}>

				<div className={profile} >
					<span className="user">
						<a href={`/profile/${m.user_id}`}>{m.user_name}</a></span>
					<div className="flood-message__profile-avatar">
						<img src={m.user_avatar} alt={m.user_name} />
					</div>
				</div>

				<div className="flood-message__text">
					<div className={topLine}>
						<span className={textTime}>{m.time}</span>

						<div className='flood-message__edit-block'>
							<span className='flood-message__edit'
								id={m.id}
								onClick={() => msgSet(m.id)}>
								<AiOutlineSetting />
							</span>
							{m.isHide ? '' : setBtn}
						</div>

						<div className={textContent} dangerouslySetInnerHTML={{
							__html: `${m.content?.replace(/\n/g, `</br>`)}`
						}} />
					</div>
				</div>

			</div>
		)
	})

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
				{allMsg}
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