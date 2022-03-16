import React from 'react'
import EpiModal from '../epiModal'


const OneEpi = () => {
	const epiOpen = () => {
		console.log('divdsn')
	}

	return (
		<div className='epi-wrapper'>
			<div className='epi-title' onClick={epiOpen}>
				<span className='epi-fandom'>[Фандом]</span> - <span className='epi-name'>Название эпа</span></div>

			<EpiModal
				name='Подсмотреть'
				className='btns btns-common btns-open'
				epiName='Название эпа'
				fandom='Фандом'
				image='https://i.pinimg.com/736x/02/bd/c1/02bdc11f4cd3639482319280979c3d1f--blog-manga.jpg'
				members={'Игрок1, Игрок2'}
				text='его прозвали «волшебной смолой древнего леса» и «защитником от болезней» за уникальные лечебные свойства. считается, что янтарь помогает при различных болях, обладает противовоспалительным и бактерицидным действием, нормализует давление и улучшает зрение. а содержание различных микроэлементов в янтаре стимулирует работу щитовидной железы, пищеварительной системы, положительно влияет на работу сердца.' />
		</div>
	)
}

export default OneEpi