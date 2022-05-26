import React from 'react'

const PreviewInfo = ({ formData, setFormData }) => {
	return (
		<>
			<div className='create-char-wrapper'>
				<div className='create-char-name'>
					{formData?.name}
				</div>

				<div className='create-char-avatar'>
					<img src={formData?.avatar} className='profile-avatar-img' alt='' />
				</div>

				<div className='create-char-desc' dangerouslySetInnerHTML={{
					__html: `<p>${formData?.description}</p>`
				}} />

			</div>
		</>
	)
}

export default PreviewInfo