import React from 'react'

const SendOrRemove = ({ sendBtn, removeBtn, disablBtn }) => {

	return (
		<div className='send-post-form__btns'>
			<button className='btns btns-send' disabled={disablBtn} onClick={sendBtn} >Отправить</button> <button className='btns btns-send' onClick={removeBtn}>Очистить</button>
		</div>
	)
}

export default SendOrRemove