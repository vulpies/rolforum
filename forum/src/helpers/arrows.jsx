import React from 'react'
import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";


const Arrows = ({ className }) => {
	const scrollToBottom = () => {
		window.scrollTo(0, document.body.scrollHeight)
	}

	const scrollToTop = () => {
		window.scrollTo(document.body.clientHeight, 0)
	}

	return (<>

		<div className={className}>
			<div className='arrows-down' onClick={scrollToBottom}>
				<BsArrowDownCircle />
			</div>
			<div className='arrows-up' onClick={scrollToTop}>
				<BsArrowUpCircle />
			</div>
		</div>

	</>
	)
}

export default Arrows