import React from 'react'
import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";


const Arrows = () => {
	const scrollToBottom = () => {
		window.scrollTo(0, document.body.scrollHeight)
	}

	const scrollToTop = () => {
		window.scrollTo(document.body.clientHeight, 0)
	}

	return (<>

		<div className='arrows-wrapper'
		>
			<div className='arrows-left' onClick={scrollToBottom}>
				<BsArrowDownCircle />
			</div>
			<div className='arrows-right' onClick={scrollToTop}>
				<BsArrowUpCircle />
			</div>

		</div>
	</>
	)
}

export default Arrows