import React from 'react'
import Modal from "react-bootstrap/Modal"
import { Button } from "react-bootstrap"
import { useState } from 'react';
import CommonBtn from './CommonBtn';

const EpiModal = ({ name, text, className, fandom, epiName, members, image }) => {
	const [show, setShow] = useState(false)

	const handleClick = () => {
		setShow(true)
	}

	let desc = [...text].join('').slice(0, 300) + '...'


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
						<img src={image} className='modal-img__image' />
					</div>
					<div className='modal-members'><span>Участники</span>: {members}</div>
					<div className='modal-desc'><span>Описание</span>: {desc}</div>
				</Modal.Body>


				<Modal.Footer>
					<CommonBtn
						className={className}
						onClick={() => setShow(false)}
						name="Скрыть"
					/>

				</Modal.Footer>
			</Modal>
		</>
	)
}

export default EpiModal