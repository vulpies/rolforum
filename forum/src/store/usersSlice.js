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
		// addNewUser: (state, action) => {
		// 	state.allUsers.push(action.payload)
		// 	state.auth = true
		// },
		addUserInfo: (state, action) => {
			state.user = [...state.user, action.payload]
			state.auth = true
		},
		// updateUserInfo: (state, action) => {
		// 	const a = state.user.filter((n) => n.user_id === action.payload.id) || []
		// 	state.user = [...a, action.payload]
		// 	state.auth = true
		// },
		// getUserInfo: (state) => {
		// 	state.user = [...state.user]
		// 	state.auth = true
		// },
		userLogout: (state) => {
			state.user = []
			state.auth = false
		},
	},
})

const { actions, reducer } = usersSlice

export const fullSliceState = (state) => state.usersSlice.user

export default reducer
export const { addUserInfo, userLogout } = actions


