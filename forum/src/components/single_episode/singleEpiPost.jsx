import React, { useCallback } from 'react'
import { commonDelete } from '../../helpers/commonFetch'
import EditOrRemove from '../../helpers/editOrRemove'
import GetLike from '../../helpers/getLike'

const SingleEpiPost = ({ posts }) => {
	let filteredPosts = posts

	console.log(filteredPosts, '8888')
	console.log(posts, 'msgmsgmsg')

	function openProfile() {
		console.log('vdsvv')
	}

	const getAllPosts = useCallback((param) => {
		filteredPosts.filter(item => item.id !== param);
	}, [filteredPosts])

	const deleteMsg = useCallback((id) => {
		console.log('grurvnrd', id)
		commonDelete(`https://api.postscriptum.games/v1/post-delete/${id}`,
			getAllPosts(id))
	}, [getAllPosts])



	return (<>
		{filteredPosts && filteredPosts.map(p =>
			<div key={p.id} className='sepi-post-wrapper'>

				<div className='sepi-post-title'>
					<div className='sepi-post-title__author'>{p.character_name}</div>
					<div className='sepi-post-title__date'>{p.created_at}</div>
				</div>
				<hr className='hr-underline' />

				<div className='sepi-post-post'>

					<div className='sepi-post-avatar' onClick={openProfile}>
						<img src={p.character_avatar} alt={p.character_name} />
					</div>

					<div className='sepi-post-post__content' dangerouslySetInnerHTML={{
						__html: `${p.content}`
					}} />

				</div>

				<div className='sepi-post-post__btns'>
					<div className='sepi-header-desc__items' >
						{p.can_edit ? <EditOrRemove onDelete={() => deleteMsg(p.id)} /> : ''}

						<GetLike />
					</div>
				</div>
				<hr className='hr-underline' />
			</div>
		)}

	</>
	)
}

export default SingleEpiPost