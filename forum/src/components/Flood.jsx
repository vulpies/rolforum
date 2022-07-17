import React, { useEffect, useState, useCallback } from 'react'
import { AiOutlineSetting } from "react-icons/ai";
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { commonDelete, commonFetch } from '../helpers/commonFetch';
import Editors from '../helpers/editors';
import SendOrRemove from './buttons/send_or_remove';
import { AiOutlineUnorderedList, AiOutlineMore } from "react-icons/ai";
import mainPic from '../images/static.gif'
import { useTranslation } from "react-i18next";
import Loading from '../helpers/loading';
import {useParams} from "react-router-dom";

const Flood = () => {
	const { t } = useTranslation();
	const [user] = useSelector((state) => state.usersReducer.user)
	const [text, setText] = useState('')
	const [socket_con, setSocket] = useState(null)
	const [msg, setMsg] = useState([])
	const [count, setCount] = useState(40)
	const [isHide, setHide] = useState(true)
	const [endMsgList, setEndMsgList] = useState(false)
	const [chatName, setChatName] = useState('')
	const search = useParams();

	function updMsgs(param) {
		param.messages.forEach(p => p["isHide"] = true)
		setChatName(param.chat.name)
		setMsg(param.messages)
	}

	const url = `https://api.postscriptum.games/v1/chat-message-list/${search.chatId}`;
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
			socket.send(JSON.stringify({ action: "sendmessage", data: { updateToken: true, token: localStorage.getItem('token'), chatId: search.chatId } }));
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
		// const wrapper = document.querySelector('.wrapper')
		// wrapper.addEventListener('click', () => {
		// 	// console.log(1111)
		// 	// console.log(msg, 777)

		// 	for (let index = 0; index < msg.length; ++index) {
		// 		msg[index].isHide = true
		// 	}

		// 	// msg.map(item => {
		// 	// 	item.isHide = true
		// 	// 	console.log(item, '9999')
		// 	// })
		// 	console.log(isHide, 777)
		// 	setHide(9)
		// 	console.log(isHide, 9999)
		// })

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
				text: t("components.flood.empty_message"),
			})
		}
	}

	const onKeyDown = event => {
		if ((event.keyCode === 13) && (event.ctrlKey)) {
			sendMessage()
		}
	}

	function msgSet(id) {
		// const wrapper = document.querySelector('.wrapper')
		const msgId = msg.find(m => m.id === id)
		if (msgId.id === id) {
			msgId.isHide = !msgId.isHide
			setHide(prevState => !prevState)
			console.log(isHide, 8888)
		}

		// if (msgId.id === id && wrapper) {
		// 	wrapper.addEventListener('click', () => {
		// 		msgId.isHide = true
		// 	})
		// }
	}

	function getAllMsg(param) {
		param.forEach(p => p["isHide"] = true)
		setMsg((msg) => param.concat(msg));

		if (param.length < 40) {
			setEndMsgList(true)
		}
	}

	async function loadHistory() {
		setCount(count => count + 40)
		const url = `https://api.postscriptum.games/v1/chat-message-list?offset=${count}`
		commonFetch(url, getAllMsg)
	}

	function deleteMsg(id) {
		commonDelete(`https://api.postscriptum.games/v1/chat-message-delete/${id}`,
			setMsg(msg.filter(item => item.id !== id)))
	}

	const allMsg = msg?.map(m => {

		const owner = m.user_name === user?.user_name
		const message = owner ? 'flood-message flood-message-owner' : 'flood-message';
		const profile = owner ? 'flood-message__profile flood-message__profile-owner' : 'flood-message__profile';
		const topLine = owner ? 'flood-message__top-line flood-message__top-line-owner' : 'flood-message__top-line';
		const textTime = owner ? 'flood-message__text-time flood-message__text-time-owner' : 'flood-message__text-time';
		const textContent = owner ? 'flood-message__text-content-owner flood-message__text-content' : 'flood-message__text-content';

		const setBtn = owner ? <div className={'flood-message__edit-options-owner flood-message__edit-options'}>
			<p>{t("components.flood.edit")}</p>
			<p>{t("components.flood.quote")}</p>
			<p onClick={() => deleteMsg(m.id)}>{t("components.flood.delete")}</p>
		</div>
			: <div className='flood-message__edit-options'>
				<p>{t("components.flood.quote")}</p>
			</div>

		return (
			<div className={message} key={m.id}>
				<div className={profile} >
					<span className="user">
						<a href={`/profile/${m.user_id}`}>{m.user_name}</a></span>
					<div className="flood-message__profile-avatar">
						<img src={m.user_avatar ? m.user_avatar : mainPic} alt={m.user_name} />
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
		<>
			<div className='flood-name__wrapper'>
				<div className='flood-name'>
					<button className='btns btns-flood'><AiOutlineUnorderedList /></button>
					<p className='flood-title'>{chatName}</p>
					<button className='btns btns-flood'><AiOutlineMore /></button>
				</div>
			</div>

			<div className='flood-load-history'>
				<button className='btns btns-load' onClick={loadHistory} style={{ 'display': endMsgList ? 'none' : '' }}>{t("components.flood.load_more")}</button>
			</div>

			<div id="message-area" className='flood-rcvd-msg'>
				{allMsg ? allMsg : <Loading />}
			</div>

			<div className='flood-wrapper__send'>
				<p>{t("components.flood.type_message")}</p>

				<Editors className='editor-line__flood' param={text.trim()} setParam={setText} id='message' />

				<textarea id="message"
					value={text}
					onChange={(e) => setText(e.target.value)}
					onKeyDown={onKeyDown}
					className='flood-wrapper__send-msg'></textarea>

				{socket_con ? <SendOrRemove sendBtn={(e) => sendMessage()} removeBtn={() => setText('')} /> : ""}

			</div>
		</>
	)
}

export default Flood