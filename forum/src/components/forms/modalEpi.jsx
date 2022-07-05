import React from 'react'
import { Link } from 'react-router-dom'
import CommonBtn from '../buttons/CommonBtn'


const ModalEpi = ({ show, onClose, fandom, epiName, image, members, link, text }) => {

	let desc = [...text].join('')

	if (desc.length > 430) {
		desc = [...text].join('').slice(0, 430) + '...'
	} else {
		desc = [...text].join('')
	}

	const modalClass = {
		'left': 0,
		'right': 0,
		'bottom': 0,
		'top': 0,
		'position': 'fixed'
	}

	return (
		<>
			{show ?
				<div style={modalClass} onClick={onClose}>
					<div className="epi-modal" onClick={(e) => e.stopPropagation()}>
						<div className="epi-modal-content">

							<div className="epi-modal-header">
								<span className='epi-fandom'>[{fandom}]</span> - <span className='epi-name'>{epiName}</span>
							</div>

							<div className="epi-epi-modal-body">
								<div className='modal-img'>
									<img src={image} className='epi-modal-img__image' alt='картинка убежала' />
								</div>
								<div className='epi-modal-members'><span>Участники</span>: {members.join(', ')}</div>

								<div className='epi-modal-desc' dangerouslySetInnerHTML={{
									__html: `<span>Описание</span>: ${desc}`
								}} />
							</div>

							<div className="epi-modal-footer">
								<CommonBtn
									className='btns btns-common'
									onClick={onClose}
									name="Скрыть"
								/>
								<Link to={link}>
									<button className='btns btns-common'>Перейти</button>
								</Link>
							</div>
						</div>
					</div>
				</div> : ''
			}
		</>
	)
}

export default ModalEpi