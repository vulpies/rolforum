import React from 'react'

const PreviewInfo = ({ formData }) => {

	return (
		<>
			<div className='create-char-wrapper'>
				<div className='create-char-name'>
					{formData?.fandom_name ? <span>[{formData?.fandom_name}]</span> : ''}
					<p>{formData?.name}</p>
				</div>

				<div className='create-char-avatar'>
					<img src={formData?.avatar} className='profile-avatar-img' alt='' />
				</div>

				<div className='create-char-desc' dangerouslySetInnerHTML={{
					__html: `${formData?.description.replace(/\n/g, `</br>`)}`
				}} />

			</div>
		</>
	)
}

export default PreviewInfo