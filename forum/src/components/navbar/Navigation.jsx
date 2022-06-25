import React from "react"
import Navbar from "../Navbar"
import MainMenu from "./MainMenu"
import NavState from "./NavState"

const Navigation = () => {
	return (
		<>
			<NavState>
				<MainMenu />
			</NavState>
			<Navbar />
		</>
	)
}

export default Navigation
