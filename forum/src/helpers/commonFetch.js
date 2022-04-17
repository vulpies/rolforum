import axios from "axios"

let options = {}

if (localStorage.getItem('token')) {
	options = {
		headers: {
			'Authorization': `Bearer ${localStorage.getItem('token')}`
		}
	}
}

export const commonFetch = (url, setParam) => {
	axios.get(url, options)
		.then(res => setParam(res.data))
		.catch(err => console.log(err))
}

export const sendEpiFetch = (url, postInfo) => {
	axios.post(url,
		JSON.stringify(postInfo), options
	)
		.catch(err => console.log(err))
}