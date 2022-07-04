import React from 'react'
import { Link } from 'react-router-dom'
import EditOrRemove from '../../helpers/editOrRemove'
import GetLike from '../../helpers/getLike'

const SingleEpiHeader = ({ header }) => {
	const userList = []

	header.characters.map(m => m.mask ? userList.push({ name: m.mask, id: m.id }) : userList.push({ name: m.name, id: m.id }))

	// const str = ', '
	const users = userList.map((item, i) => {
		// console.log(item.name.concat(str))
		return <Link to={`/profile/${item.id}`} key={item.id}>
			{item.name}
			{i < (userList.length - 1) && ", "}
		</Link>
	})

	console.log(users, 'users')


	return (
		<div className='sepi-wrapper'>

			<div className='sepi-header-title'>
				{/* <p className='sepi-header-title__author'>Leto II Atreides</p> */}
				<p className='sepi-header-title__date'>{header.created_at}</p>
			</div>

			<div className='sepi-header-desc'>

				<div className='sepi-header-desc__title'>
					<span className='epi-fandom'>[{header.fandoms.length > 1 ? header.fandoms.join(', ') : header.fandoms[0]}] </span>
					- {header.title}
				</div>

				<div className='sepi-header-desc__image'>
					<img src={header.image} alt='картинка убежала' />
				</div>

				<div className='sepi-header-desc__members'>
					{users}
				</div>

				<div className='sepi-header-desc__subtitle' dangerouslySetInnerHTML={{
					__html: `${header.summary}`
				}} />

			</div>

			<div className='sepi-header-desc__items' >
				{header.can_edit ? <EditOrRemove /> : ''}
				<GetLike />
			</div>

		</div>
	)
}

export default SingleEpiHeader