import React from "react"

const CommonBtn = ({ name, onClick, className }) => {
	return (
		<button className={className} onClick={onClick}>
			{name}
		</button>
	)
}

export default CommonBtn