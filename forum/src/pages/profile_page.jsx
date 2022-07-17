import React from 'react'
import { useEffect, useState } from 'react'
import { BsPencil, BsChatText } from 'react-icons/bs'
import { useParams, useNavigate } from 'react-router-dom'
import Breadcrumbs from '../components/breadcrumbs'
import { commonFetch } from '../helpers/commonFetch'
import { useTranslation } from "react-i18next";
import Loading from '../helpers/loading'

const Profile = () => {
	const { t } = useTranslation();
	const navigate = useNavigate()

	const search = useParams();
	const [info, setInfo] = useState([])

	useEffect(() => {
		commonFetch(`https://api.postscriptum.games/v1/profile/view/${search.profId}`, setInfo)
	}, [setInfo, search.profId])


	return (
		<div className='wrapper'>
			<div className='epi-links single-link'>
				<Breadcrumbs name={t("pages.profile_page.breadcrumbs_profile")} />
			</div>

			{info ?
				<div className='profile-wrapper'>
					<div className='profile-wrapper__mobile'>
						<div className='profile-top'>
							<p className='profile-name'>{t("pages.profile_page.username")} <span>{info?.user_name}</span></p>
							{info?.user_name === localStorage.getItem('username') ?

								<button className='btns profile-edit' onClick={() => navigate(`/profile/${info?.user_id}/edit`)}>
									<BsPencil />
								</button>
								: ''}
							<button className='btns profile-chat'><BsChatText /></button>
						</div>

						<div className='profile-avatar'>
							<img src={info?.user_avatar} className='profile-avatar-img' alt='' />
							<div className='profile-chars'>
								{info?.characters ?
									<>
										<p>{t("pages.profile_page.characters")}</p>
										<div className='profile-chars-list'>

											{info?.characters?.length !== 0 ? info?.characters?.map(c =>
												<img src={c.avatar} key={c.id} alt={c.name} onClick={() => navigate(`/characters/${c.id}`)} className='profile-chars-img' />
											) : t("pages.profile_page.no_character_image")}

										</div>
									</> : <p>{t("pages.profile_page.no_characters")}</p>}

							</div>

						</div>

						<div className='profile-common__info'>
							<p>{t("pages.profile_page.registered")} <span>{info?.registered_at?.split(' ')[0]}</span></p>
							<p>{t("pages.profile_page.reputation")} <span>999999999</span></p>
							<p>{t("pages.profile_page.episode_count")} <span>{info?.episode_count}</span></p>
							<p>{t("pages.profile_page.post_count")} <span>{info?.post_count ?? 0}</span></p>
							<p>{t("pages.profile_page.last_post")} <br /><span>{info?.last_post ? info?.last_post : t("pages.profile_page.no_post")}</span></p>
							<p>{t("pages.profile_page.last_visit")} <br /><span>{info?.last_page_load_at}</span></p>
							<p>{t("pages.profile_page.last_activity")} <br /><span>{info?.last_activity_at}</span></p>
						</div>

					</div>

					<div className='profile-wrapper__tabdesk'>
						<div className='profile-top'>
							<p className='profile-name'>{t("pages.profile_page.username")} <span>{info?.user_name}</span></p>
							{info?.user_name === localStorage.getItem('username') ?
								<button className='btns profile-edit' onClick={() => navigate(`/profile/${info?.user_id}/edit`)}>
									<BsPencil />
								</button>
								: ''}
							<button className='btns profile-chat'><BsChatText /></button>
						</div>

						<div className='profile-wrapper__common'>

							<div className='profile-wrapper__common-left'>
								<div className='profile-avatar'>
									<img src={info?.user_avatar} className='profile-avatar-img' alt='' />

									<div className='profile-chars'>
										<p>{t("pages.profile_page.characters")}</p>
										<div className='profile-chars-list'>
											{info?.characters?.length !== 0 ? info?.characters?.map(c =>
												<img src={c.avatar} key={c.id} alt={c.name} onClick={() => navigate(`/characters/${c.id}`)} className='profile-chars-img' />
											) : t("pages.profile_page.no_character_image")}

										</div>
									</div>
								</div>
							</div>

							<div className='profile-wrapper__common-right'>
								<div className='profile-common__info'>
									<p>{t("pages.profile_page.registered")} <span>{info?.registered_at?.split(' ')[0]}</span></p>
									<p>{t("pages.profile_page.reputation")} <span>999999999</span></p>
									<p>{t("pages.profile_page.episode_count")} <span>{info?.episode_count}</span></p>
									<p>{t("pages.profile_page.post_count")} <span>{info?.post_count ?? 0}</span></p>
									<p>{t("pages.profile_page.last_post")} <span>{info?.last_post ? info?.last_post : t("pages.profile_page.no_post")}</span></p>
									<p>{t("pages.profile_page.last_visit")} <span>{info?.last_page_load_at}</span></p>
									<p>{t("pages.profile_page.last_activity")} <span>{info?.last_activity_at}</span></p>
								</div>
							</div>
						</div>

					</div>
				</div> : <Loading />
			}

		</div>
	)
}

export default Profile