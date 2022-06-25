import React, { useEffect, useState } from 'react'
import { commonDelete } from '../../helpers/commonFetch'
import EditOrRemove from '../../helpers/editOrRemove'
import GetLike from '../../helpers/getLike'

const SingleEpiPost = ({ posts }) => {
	const [msg, setMsg] = useState(posts)

	useEffect(() => {
		setMsg(posts);
	}, [posts])

	function openProfile() {
		console.log('vdsvv')
	}


	function deleteMsg(id) {
		commonDelete(`https://api.postscriptum.games/v1/post-delete/${id}`)
		setMsg(msg.filter(item => item.id !== id))
	}



	return (<>
		{msg && msg.map(p =>
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