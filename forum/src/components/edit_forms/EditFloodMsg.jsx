import { useParams } from 'react-router-dom'
import CommonEditTextForm from './CommonEditTextForm'

const EditFloodPost = () => {
	const { chatMsgId } = useParams()

	return (
		<CommonEditTextForm
			postId={chatMsgId}
			getInfo='https://api.postscriptum.games/v1/chat-message-edit-data/'
			sendUpdInfo='https://api.postscriptum.games/v1/chat-message-edit'
			text='message_id'
			partOne='chats'
			partTwo='chat_id'
			id='edit_flood_msg'
		/>
	)
}

export default EditFloodPost