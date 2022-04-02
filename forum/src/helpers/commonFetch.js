import axios from "axios"

export const commonFetch = (url, setParam) => {
	axios.get(url, {
		headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
	})
		.then(res => setParam(res.data))
		.catch(err => console.log(err))
}

export const sendPostFetch = (url, postInfo) => {
	axios.post(url,
		JSON.stringify(postInfo),
		{
			headers: {
				"Content-Type": "application/json",
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		}
	)
		.catch(err => console.log(err))
}