import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { EditOrRemove } from '../../helpers/editOrRemove'
import GetLike from '../../helpers/getLike'
import { useTranslation } from 'react-i18next'
import { SwallDeleteMsg, SwallDeleteMsgSimple } from '../../helpers/swall_notifications'
import { useDeletePostMutation, useGetPostsQuery } from '../../store/apiSlice'
import Loading from '../../helpers/loading'

const SingleEpiPost = () => {
	const { epiId } = useParams()
	const { t } = useTranslation();
	// const [msg, setMsg] = useState(posts)
	const navigate = useNavigate()

	const { data: { posts }, isSuccess } = useGetPostsQuery(epiId)
	// const [deletePost] = useDeletePostMutation()


	useEffect(() => {
		const hash = window.location.hash;
		if (hash) {
			const element = document.getElementById(hash.substring(1));
			if (element) {
				element.scrollIntoView();
			}
		}
	}, [epiId])

	console.log(posts, 'posts')


	return (
		<>
			{isSuccess ?
				posts.map((p, i) =>
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
										onDelete={() => SwallDeleteMsgSimple(t("components.singleEpiPost.delete_post"), t("components.singleEpiPost.cancel_btn"), t("components.singleEpiPost.confirm_delete"), t("components.singleEpiPost.was_deleted"), `https://api.postscriptum.games/v1/post-delete/${p.id}`)}
										onEdit={() => navigate(`/episodes/edit/${p.id}`)}
									/> : ''}
								<GetLike />
							</div>
						</div>
						<hr className='hr-underline' />
					</div>)
				: <Loading />}
		</>
	)



	// return (
	// 		{isSuccess ? <>
	// 			posts.posts.map((p, i) => (

	// 					<div key={p.id} className='sepi-post-wrapper'>

	// 						<div className='sepi-post-title'>
	// 							<div className='sepi-post-title__author'>{p.character_name}</div>
	// 							<div className='sepi-post-title__date' id={`p${p.id}`}><a href={`#p${p.id}`}>{p.created_at}</a><span className='sepi-post-title__number'>#{i + 1}</span></div>
	// 						</div>
	// 						<hr className='hr-underline' />

	// 						<div className='sepi-post-post'>

	// 							<div className='sepi-post-avatar'>
	// 								<img src={p.character_avatar} alt={p.character_name} onClick={() => navigate(`/characters/${p.character_id}`)} />
	// 							</div>

	// 							<div className='sepi-post-post__content' dangerouslySetInnerHTML={{
	// 								__html: `${p.content?.replace(/\s-\s/gm, ' — ')}`
	// 							}} />

	// 						</div>

	// 						<div className='sepi-post-post__btns'>
	// 							<div className='sepi-header-desc__items' >
	// 								{p.can_edit ?
	// 									<EditOrRemove
	// 										onDelete={() => SwallDeleteMsgSimple(t("components.singleEpiPost.delete_post"), t("components.singleEpiPost.cancel_btn"), t("components.singleEpiPost.confirm_delete"), t("components.singleEpiPost.was_deleted"), deletePost(p.id))}
	// 										onEdit={() => navigate(`/episodes/edit/${p.id}`)}
	// 									/> : ''}
	// 								<GetLike />
	// 							</div>
	// 						</div>
	// 						<hr className='hr-underline' />
	// 					</div>
	// 				</>): <Loading />}
	// 	</>
	// )
}

export default SingleEpiPost