import React from 'react'
import { useTranslation } from "react-i18next";

const SendOrRemove = ({ sendBtn, removeBtn, disablBtn }) => {
	const { t } = useTranslation();

	return (
		<div className='send-post-form__btns'>
			<button className='btns btns-send' disabled={disablBtn} onClick={sendBtn} >{t("components.send_or_remove.submit")}</button> <button className='btns btns-send' onClick={removeBtn}>{t("components.send_or_remove.clear")}</button>
		</div>
	)
}

export default SendOrRemove