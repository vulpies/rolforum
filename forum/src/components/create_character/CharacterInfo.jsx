import React from 'react'
import CommonInputs from '../../helpers/CommonInputs'

const CharacterInfo = ({ formData, setFormData }) => {
	return (
		<>
			<div className='create-new-epi__title create-new-epi__character-desc'>
				<CommonInputs
					type='text'
					inputName='Как зовут персонажа:'
					className='create-new-epi__input'
					value={formData?.name}
					onChange={(e) => {
						setFormData({ ...formData, name: e.target.value });
					}}
					placeholder={"На английском"}
				/>
				<p>Имя / фамилия (или фамилия / имя) персонажа в английском варианте. Допустимо что-то одно, если второе по канону отсутствует или является наиболее распространненым вариантом обращения. Если у персонажа по канону отсутствует и имя, и фамилия, то допустимо наиболее известное или употребимое прозвище.</p>
			</div>

			<div className='create-new-epi__title create-new-epi__character-desc'>
				<CommonInputs
					type='text'
					inputName='Аватар:'
					className='create-new-epi__input'
					value={formData?.avatar}
					onChange={(e) => {
						setFormData({ ...formData, avatar: e.target.value });
					}}
					placeholder={"Вставьте ссылку на изображение"}
				/>
				<p>Максимально допустимый размер 200х200. В противном случае картинка автоматически уменьшится и пострадает в качестве.</p>
			</div>

			<div className='create-new-epi__title create-new-epi__character-desc'>
				<label className='create-new-epi__title'>Описание:</label>
				<textarea type='text' className='create-new-epi__text'
					placeholder='Подробное (или не очень) описание персонажа'
					value={formData?.description}
					onChange={(e) => {
						setFormData({ ...formData, description: e.target.value });
					}}>
				</textarea>
				<p>Здесь вы можете указать совершенно любую информацию, имеющую отношение к вашему персонажу: его возраст, привычки, хобби, увлечения, страхи, характер, биография и т.д. Все, что взбредет в голову и будет важно с вашей точки зрения для раскрытия персонажа, чтобы другим было понятно, с кем они будут играть и что ваш персонаж из себя представляет.</p>
				<p><b>Для канноных персонажей</b> при нежелании расписывать все подробно можно прикрепить ссылку на какую-либо статью по нему из различных источников и добавить от себя несколько строк.</p>
				<p><b>Для неканонов</b> - чем подробнее и детальнее распишите, тем проще будет вашим потенциальным соигрокам для понимания персонажа.</p>
			</div>

		</>
	)
}

export default CharacterInfo