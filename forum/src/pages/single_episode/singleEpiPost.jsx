import React from 'react'
import GetLike from '../../helpers/getLike'

const SingleEpiPost = ({ posts }) => {
	console.log(posts, 'posts')

	// console.log(posts[0].created_at)



	return (<>
		{posts && posts.map(p =>
			<div key={p.id} className='sepi-post-wrapper'>

				<div className='sepi-post-title'>
					<div className='sepi-post-title__author'>{p.character}</div>
					<div className='sepi-post-title__date'>{p.created_at}</div>
				</div>
				<hr />

				<div className='sepi-post-post'>
					<div className='sepi-post-post__content'>
						{p.content.split('<br/>')}
					</div>
					<div className='sepi-post-post__btns'>
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