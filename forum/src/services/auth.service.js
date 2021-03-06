import axios from "axios"

const url = "https://api.postscriptum.games/"

const authService = {
	registration: async (payload) => {
		try {
			const { data } = await axios.post(url + "registration/", payload)
			return data
		} catch (error) {
			return error
		}
	},
	login: async (payload) => {
		try {
			const { data } = await axios.post(url + "login", payload)
			return data
		} catch (error) {
			return error
		}
	}

}
export default authService