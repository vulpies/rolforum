import { useParams } from 'react-router-dom'
import CommonEditTextForm from './CommonEditTextForm'

const EditPost = () => {
	const { epiPostId } = useParams()

	return (
		<CommonEditTextForm
			postId={epiPostId}
			getInfo='https://api.postscriptum.games/v1/post-edit-data/'
			sendUpdInfo='https://api.postscriptum.games/v1/post-edit'
			text='post_id'
			partOne='episodes'
			partTwo='episode_id'
			id='edit_post_msg'
		/>
	)
}

export default EditPost