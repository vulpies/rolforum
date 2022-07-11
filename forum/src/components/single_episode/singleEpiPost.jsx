import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { commonDelete } from '../../helpers/commonFetch'
import EditOrRemove from '../../helpers/editOrRemove'
import GetLike from '../../helpers/getLike'
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next'

const SingleEpiPost = ({ posts }) => {
	const { t } = useTranslation();
	const [msg, setMsg] = useState(posts)
	const navigate = useNavigate()

	useEffect(() => {
		setMsg(posts);
	}, [posts])

	function deleteMsg(id) {
		Swal.fire({
			title: t("components.singleEpiPost.delete_post"),
			width: 350,
			cancelButtonText: t("components.singleEpiPost.cancel_btn"),
			position: 'top',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#1aae26',
			cancelButtonColor: '#d33',
			confirmButtonText: t("components.singleEpiPost.confirm_delete")
		}).then((result) => {
			if (result.isConfirmed) {
				commonDelete(`https://api.postscriptum.games/v1/post-delete/${id}`)
				setMsg(msg.filter(item => item.id !== id))
				Swal.fire({
					width: 350,
					title: t("components.singleEpiPost.was_deleted"),
					icon: 'success'
				})
			}
		})
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