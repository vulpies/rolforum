import React from 'react'
import EditOrRemove from '../../helpers/editOrRemove'
import GetLike from '../../helpers/getLike'

const SingleEpiPost = ({ posts }) => {
	let filteredPosts = posts

	function openProfile() {
		console.log('vdsvv')
	}

	function deleteMsg(id) {
		console.log('grurvnrd', id)
		filteredPosts = posts.filter(item => item.id !== id)
		// console.log(filteredPosts)
	}

	// { `/profile/${p?.user_id}` }

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