import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { commonDelete } from '../../helpers/commonFetch'
import EditOrRemove from '../../helpers/editOrRemove'
import GetLike from '../../helpers/getLike'
import EditMessage from '../EditMesage'

const SingleEpiPost = ({ posts }) => {
	const [msg, setMsg] = useState(posts)
	const navigate = useNavigate()

	useEffect(() => {
		setMsg(posts);
	}, [posts])

	console.log(posts)


	function deleteMsg(id) {
		commonDelete(`https://api.postscriptum.games/v1/post-delete/${id}`)
		setMsg(msg.filter(item => item.id !== id))
	}

	return (
		<>
			{msg && msg.map((p, i) =>
				<div key={p.id} className='sepi-post-wrapper'>

					<div className='sepi-post-title'>
						<div className='sepi-post-title__author'>{p.character_name}</div>
						<div className='sepi-post-title__date' id={p.id}>{p.created_at} <span className='sepi-post-title__number'>#{i + 1}</span></div>
					</div>
					<hr className='hr-underline' />

					<div className='sepi-post-post'>

						<div className='sepi-post-avatar'>
							<img src={p.character_avatar} alt={p.character_name} onClick={() => navigate(`/profile/${p.character_id}`)} />
						</div>

						<div className='sepi-post-post__content' dangerouslySetInnerHTML={{
							__html: `${p.content?.replace(/\s-\s/gm, ' — ')}`
						}} />

					</div>

					<div className='sepi-post-post__btns'>
						<div className='sepi-header-desc__items' >
							{p.can_edit ?
								<EditOrRemove
									onDelete={() => deleteMsg(p.id)}
									onEdit={() => navigate(`/edit_msg`)}
								/> : ''}

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