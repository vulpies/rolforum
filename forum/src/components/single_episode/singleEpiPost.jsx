import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { EditOrRemove } from '../../helpers/editOrRemove'
import GetLike from '../../helpers/getLike'
import { useTranslation } from 'react-i18next'
import { SwallDeleteMsg, SwallDeleteMsgSimple } from '../../helpers/swall_notifications'
import Loading from '../../helpers/loading'
import { useDeletePostMutation } from '../../store/apiSlice'

const SingleEpiPost = ({ posts }) => {
	const { t } = useTranslation();
	const navigate = useNavigate()
	const [deletePost] = useDeletePostMutation()

	console.log(posts, 'posts2222')

	useEffect(() => {
		const hash = window.location.hash;
		if (hash) {
			const element = document.getElementById(hash.substring(1));
			if (element) {
				element.scrollIntoView();
			}
		}
	}, [])

	if (!posts) return <Loading />

	return (
		<>
			{posts.map((p, i) =>
				<div key={p.id} className='sepi-post-wrapper'>

					<div className='sepi-post-title'>
						<div className='sepi-post-title__author'>{p.character_name}</div>
						<div className='sepi-post-title__date' id={`p${p.id}`}><a href={`#p${p.id}`}>{p.created_at}</a><span className='sepi-post-title__number'>#{i + 1}</span></div>
					</div>
					<hr className='hr-underline' />

					<div className='sepi-post-post'>

						<div className='sepi-post-avatar'>
							<img src={p.character_avatar} alt={p.character_name} onClick={() => navigate(`/characters/${p.character_id}`)} />
						</div>

						<div className='sepi-post-post__content' dangerouslySetInnerHTML={{
							__html: `${p.content?.replace(/\s-\s/gm, ' — ')}`
						}} />

					</div>

					<div className='sepi-post-post__btns'>
						<div className='sepi-header-desc__items' >
							{p.can_edit ?
								<EditOrRemove
									onDelete={() => SwallDeleteMsgSimple(t("components.singleEpiPost.delete_post"), t("components.singleEpiPost.cancel_btn"), t("components.singleEpiPost.confirm_delete"), t("components.singleEpiPost.was_deleted"), deletePost(p.id))}
									// onDelete={() => deletePost(p.id)}
									onEdit={() => navigate(`/episodes/edit/${p.id}`)}
								/> : ''}
							<GetLike />
						</div>
					</div>
					<hr className='hr-underline' />
				</div>)}
		</>
	)

}

export default SingleEpiPost