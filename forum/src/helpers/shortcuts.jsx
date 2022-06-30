const onKeyDown = (event, func) => {
	if ((event.keyCode === 13) && (event.ctrlKey)) {
		func()
	}
}

export default onKeyDown