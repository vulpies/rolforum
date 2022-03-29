import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	allUsers: [],
	user: [],
	auth: false,
}

const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		addNewUser: (state, action) => {
			state.allUsers.push(action.payload)
			state.auth = false
		},
		getUserInfo: (state, action) => {
			state.user = action.payload
			state.auth = true
		},
		getOneUser: (state) => {
			state.user = [...state.user]
			state.auth = true
		},
		userLogout: (state) => {
			state.user = []
			state.auth = false
		},
	},
})

const { actions, reducer } = usersSlice

export default reducer
export const { addNewUser, getUserInfo, getOneUser, userLogout } = actions


