import React from 'react'
import { useTranslation } from 'react-i18next';
import Editors from '../helpers/editors'
import SendOrRemove from './buttons/send_or_remove'

const TextArea = ({ className, areaClassName, editorLine, name, id, param, setParam, sendBtn, removeBtn, value, onChange, onKeyDown, ref }) => {
	const { t } = useTranslation();

	return (
		<div className={className}>

			{name ? <p><b>{name}</b>, {t("components.textarea.appeal")}</p> :
				<p>{t("components.textarea.type_message")}</p>}

			<Editors className={editorLine} param={param} setParam={setParam} id={id} />

			<textarea
				id={id}
				className={areaClassName}
				value={value}
				onChange={onChange}
				onKeyDown={onKeyDown}
				ref={ref}
			>
			</textarea>

			<SendOrRemove sendBtn={sendBtn} removeBtn={removeBtn} />
		</div>
	)
}

export default TextArea