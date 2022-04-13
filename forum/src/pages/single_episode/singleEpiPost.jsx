import React from 'react'
import EditOrRemove from '../../helpers/editOrRemove'
import GetLike from '../../helpers/getLike'

const SingleEpiPost = ({ posts }) => {

	function openProfile() {
		console.log('vdsvv')
	}

	return (<>
		{posts && posts.map(p =>
			<div key={p.id} className='sepi-post-wrapper'>

				<div className='sepi-post-title'>
					<div className='sepi-post-title__author'>{p.character_name}</div>
					<div className='sepi-post-title__date'>{p.created_at}</div>
				</div>
				<hr />

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
						{p.can_edit ? <EditOrRemove /> : ''}

						<GetLike />
					</div>
				</div>
				<hr />
			</div>
		)}

	</>
	)
}

export default SingleEpiPost