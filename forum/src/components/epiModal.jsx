import React, { useState } from 'react'
import Modal from "react-bootstrap/Modal"
import { Button } from "react-bootstrap"
import CommonBtn from './CommonBtn';
import { Link } from 'react-router-dom';

const EpiModal = ({ name, text, className, fandom, epiName, members, image, link }) => {
	const [show, setShow] = useState(false)

	const handleClick = () => {
		setShow(true)
	}

	let desc = [...text].join('')

	if (desc.length > 430) {
		desc = [...text].join('').slice(0, 430) + '...'
	} else {
		desc = [...text].join('')
	}

	let list = []

	for (const [member] of members.entries()) {
		if (member.mask) {
			list.push(member.mask)
		} else {

			list.push(member.name)
		}
	}


	return (
		<>
			<Button
				className={className}
				onClick={handleClick}
			>
				{name}
			</Button>

			<Modal
				show={show}
				className='epi-modal'
			>
				<Modal.Header>
					<Modal.Title><span className='epi-fandom'>[{fandom}]</span> - <span className='epi-name'>{epiName}</span></Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<div className='modal-img'>
						<img src={image} className='modal-img__image' alt='картинка убежала' />
					</div>
					<div className='modal-members'><span>Участники</span>: {list.join(', ')}</div>

					<div className='modal-desc' dangerouslySetInnerHTML={{
						__html: `<span>Описание</span>: ${desc}`
					}} />

				</Modal.Body>


				<Modal.Footer>
					<CommonBtn
						className={className}
						onClick={() => setShow(false)}
						name="Скрыть"
					/>
					<Link to={link}>
						<button className='btns btns-common'>Перейти</button>
					</Link>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default EpiModal