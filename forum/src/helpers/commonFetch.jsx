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

export const commonPostReq = (url, postInfo) => {
	axios.post(url,
		JSON.stringify(postInfo), options
	)
		.catch(err => console.log(err))
}

export const commonDelete = (url, setParam) => {
	axios.delete(url, options)
		.then(res => setParam(res.data))
		.catch(err => console.log(err))
}