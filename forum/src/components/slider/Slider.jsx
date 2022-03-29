import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const Slider = () => {
	const user = useSelector((state) => state.usersReducer)

	console.log(user, 'user')
	console.log(user.user.user_name, 'user222')

	const [image, setImage] = useState('https://sun1-16.userapi.com/s/v1/ig1/wLhBikGgAsxrvhrQ_0ZpIadj-0ONkrAGDbB2XVASX8bS_VxxHvKKH_nFm6HaVluDzsAIAkup.jpg?size=200x200&quality=96&crop=44,0,435,435&ava=1')

	const images = [{
		'_id': 1,
		url: 'http://zano.ru/avatar/200/665.jpg',
		"name": "Dobbi"
	},
	{
		'_id': 2,
		'url': 'https://www.kfd.pl/uploads/profile/photo-299252.jpeg?_r=1471001120',
		"name": 'Masya'
	},
	{
		"_id": 3,
		"url": 'https://a.d-cd.net/x0A7xfBRwioYAzkDhgFSt9285Gc-200.jpg',
		"name": "Vasya"
	},
	{
		'_id': 4,
		url: 'https://sun9-69.userapi.com/s/v1/ig2/NQZ7zg3qfAWbIEldsH12QP3WrBX3bwrIhUHYJkFBBVnQbk_0fjs1OdCiUOwR8LnbbZTOiHE2mMEbru8GjpAzUGXI.jpg?size=200x200&quality=96&crop=0,36,200,200&ava=1',
		"name": "Bred"
	}
	]

	const changeImage = (e) => {
		const target = e.target
		setImage(target.src)
	}


	return (<>
		<p className='slider-title'>Привет, <span>{user && user.user.user_name || 'гость'}</span>!</p>

		{user.auth !== false ? <div className="slider">

			<div className='slider-main'>
				<img src={image} alt='' className='slider-main__image' />
			</div>

			<div className='slider-others'>
				{images.map((item => {
					return <img src={item.url} id={item._id} key={item._id
					} name={item.name} alt='' className='slider-others__image' onClick={changeImage} />
				}))}
			</div>
		</div> : ""
		}
	</>
	)
}

export default Slider