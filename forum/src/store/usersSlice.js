import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	users: [{ username: 'reader' }],
	user: null,
	auth: false,
}

const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		addNewUser: (state, action) => {
			state.users.push(action.payload)
			state.auth = false
		},
		getAllUsers: (state, action) => {
			state.users = action.payload
			state.auth = true
		},
		getOneUser: (state, action) => {
			state.user = state.users.find((u) => u.username === action.payload)
			state.auth = true
		},
		userLogout: (state) => {
			state.user = null
			state.auth = false
		},
	},
})

const { actions, reducer } = usersSlice

export default reducer
export const { addNewUser, getAllUsers, getOneUser, userLogout } = actions


