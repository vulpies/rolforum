import React, { useEffect, useState, useCallback } from 'react'
import { AiOutlineSetting } from "react-icons/ai";
import { useSelector } from 'react-redux';
import { commonFetch } from '../../helpers/commonFetch';
import { AiOutlineUnorderedList, AiOutlineMore } from "react-icons/ai";
import mainPic from '../../images/static.gif'
import { useTranslation } from "react-i18next";
import Loading from '../../helpers/loading';
import { useNavigate, useParams } from "react-router-dom";
import { DeleteMsgBtn, EditMsgBtn, AnswerMsgBtn } from '../../helpers/editOrRemove';
import { SwallDeleteMsg, SwallSuccess } from '../../helpers/swall_notifications';
import TextArea from '../TextArea';

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
	const { chatId } = useParams();
	const [chatsList, setChatsList] = useState()
	const [showChatsList, setShowChatsList] = useState(false)
	const navigate = useNavigate()


	useEffect(() => {
	}, [showChatsList])

	useEffect(() => {
		commonFetch(`https://api.postscriptum.games/v1/chat-room-list-user`, setChatsList)
	}, [])


	function updMsgs(param) {
		param.messages.forEach(p => p["isHide"] = true)
		setChatName(param.chat.name)
		setMsg(param.messages)
		const id = param.messages[param.messages.length - 1].id
		const element = document.getElementById('m' + id)
		if (element) {
			element.scrollIntoView()
		}
	}


	const openChat = useCallback((id = 1) => {
		commonFetch(`https://api.postscriptum.games/v1/chat-message-list/${id}`, updMsgs)
		setShowChatsList(false)
	}, [])


	const addMsg = useCallback((data) => {
		if (!data.tokenUpdate) {
			data.isHide = true
			setMsg((msg) => [...msg, data]);
		}
	}, []);

	const floodData = {
		text,
		token: localStorage.getItem('token')
	}

	const startChat = useCallback(() => {
		const socket = new WebSocket("wss://5r9ld0bvs5.execute-api.us-east-1.amazonaws.com/Prod")

		socket.onopen = function () {
			socket.send(JSON.stringify({ action: "sendmessage", data: { updateToken: true, token: localStorage.getItem('token'), chatId: chatId } }));
		};

		socket.onmessage = function (event) {
			const data = JSON.parse(event.data);
			addMsg(data)
			const element = document.getElementById('message-area')
			if (element) {
				element.scrollIntoView()
			}
		}

		socket.onclose = function (event) {
		};

		socket.onerror = function (error) {
			alert(`[error] ${error.message}`);
		};
		setSocket(socket)
	}, [addMsg, setSocket, chatId])

	useEffect(() => {
		startChat()
		openChat()
	}, [])



	function sendMessage() {
		if (text.trim() !== '') {
			socket_con.send(JSON.stringify({ action: "sendmessage", data: floodData }));
			setText('')
		} else {
			SwallSuccess(t("components.flood.empty_message"))
		}
	}

	const onKeyDown = event => {
		if ((event.keyCode === 13) && (event.ctrlKey)) {
			sendMessage()
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
		param.messages.forEach(p => p["isHide"] = true)
		setMsg((msg) => param.messages.concat(msg));

		if (param.messages.length < 40) {
			setEndMsgList(true)
		}
	}

	async function loadHistory() {
		setCount(count => count + 40)
		const url = `https://api.postscriptum.games/v1/chat-message-list/${chatId}?offset=${count}`
		commonFetch(url, getAllMsg)
	}

	function answerOnMsg(author, id) {
		const element = document.getElementById('message')
		if (element) {
			element.scrollIntoView()
		}
		setText(prevstate => prevstate + `[quote][b]${author}[/b] \n ${id}[/quote]`)
	}

	const allMsg = msg?.map(m => {

		const dltUrl = `https://api.postscriptum.games/v1/chat-message-delete/${m.id}`

		const owner = m.user_name === user?.user_name
		const message = owner ? 'flood-message flood-message-owner' : 'flood-message';
		const profile = owner ? 'flood-message__profile flood-message__profile-owner' : 'flood-message__profile';
		const topLine = owner ? 'flood-message__top-line flood-message__top-line-owner' : 'flood-message__top-line';
		const textTime = owner ? 'flood-message__text-time flood-message__text-time-owner' : 'flood-message__text-time';
		const textContent = owner ? 'flood-message__text-content-owner flood-message__text-content' : 'flood-message__text-content';
		const desktopIcons = owner ? 'flood-message__edit-desktop-owner flood-message__edit-desktop' : "flood-message__edit-desktop"

		const setBtn = owner ? <div className={'flood-message__edit-options-owner flood-message__edit-options'}>
			<p>{t("components.flood.edit")}</p>
			<p onClick={() => answerOnMsg(m.user_name, m.content)}>{t("components.flood.quote")}</p>
			<p onClick={() => SwallDeleteMsg(t("components.flood.remove_msg"), t("components.singleEpiPost.cancel_btn"), t("components.singleEpiPost.confirm_delete"), t("components.flood.confirm_dlt_msg"), dltUrl, setMsg, msg, m.id)}>{t("components.flood.delete")}</p>
		</div>
			: <div className='flood-message__edit-options'>
				<p onClick={() => answerOnMsg(m.user_name, m.content)}>{t("components.flood.quote")}</p>
			</div>

		return (
			<div className={message} key={m.id} id={`m${m.id}`}>
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


						<div className={desktopIcons}>

							{m.user_name === localStorage.getItem('username') ?
								<>
									<DeleteMsgBtn
										className='btns btns-editor sepi-header-desc__items-trash'
										onDelete={() => SwallDeleteMsg(t("components.flood.remove_msg"), t("components.singleEpiPost.cancel_btn"), t("components.singleEpiPost.confirm_delete"), t("components.flood.confirm_dlt_msg"), dltUrl, setMsg, msg, m.id)} />

									<EditMsgBtn className='btns btns-editor sepi-header-desc__items-edit' onEdit={() => navigate(`/chats/edit/${m.id}`)} />

									<AnswerMsgBtn className='btns btns-editor sepi-header-desc__items-answer' onAnswer={() => answerOnMsg(m.user_name, m.content)} />

								</> :
								<AnswerMsgBtn className='btns btns-editor sepi-header-desc__items-answer' onAnswer={() => answerOnMsg(m.user_name, m.content)} />
							}

						</div>
					</div>

					<div className={textContent} dangerouslySetInnerHTML={{
						__html: `${m.content?.replace(/\n/g, `</br>`).replace(/\s-\s/gm, ' ??? ')}`
					}} />
				</div>
			</div>
		)
	})

	return (
		<>
			<div className='flood-name__wrapper'>
				<div className='flood-name'>
					<button className='btns btns-flood' onClick={() => setShowChatsList(!showChatsList)}><AiOutlineUnorderedList /></button>
					<p className='flood-title'>{chatName}</p>
					<button className='btns btns-flood'><AiOutlineMore /></button>
				</div>
			</div>

			{msg?.length < 40 ? "" :
				<div className='flood-load-history'>
					<button className='btns btns-load' onClick={loadHistory} style={{ 'display': endMsgList ? 'none' : '' }}>{t("components.flood.load_more")}</button>
				</div>}

			<div className='flood-chats-common'>

				{showChatsList ? <div className="flood-chats-list-wrapper">

					<p className='flood-chats__list-create'><a href='/chats/create_chat'>{t("components.flood.create_chat")}</a></p>
					<p className='flood-chats__list-title'>{t("components.flood.chats_list")}</p>
					<div className='flood-chats-list-common'>
						{chatsList?.map(item => {
							return <li className='flood-chats__list-item' key={item.id} onClick={() => openChat(item.id)}>{item.name}</li>
						})}
					</div>

				</div> : ''}

				<div id="message-area" className='flood-rcvd-msg'>
					{allMsg ? allMsg : <Loading />}
				</div>

			</div>

			<TextArea
				className='flood-wrapper__send'
				param={text}
				setParam={setText}
				id='message'
				value={text}
				editorLine='editor-line__flood'
				onChange={(e) => setText(e.target.value)}
				onKeyDown={onKeyDown}
				areaClassName='flood-wrapper__send-msg'
				sendBtn={(e) => sendMessage()}
				removeBtn={() => setText('')}
			/>

		</>
	)
}

export default Flood