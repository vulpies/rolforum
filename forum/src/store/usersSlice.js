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
		addUserInfo: (state, action) => {
			state.user.push(action.payload)
			state.auth = true
		},
		getUserInfo: (state) => {
			return state.user
		},
		userLogout: (state) => {
			state.user = []
			state.auth = false
		},
	},
})

const { actions, reducer } = usersSlice

export const fullSliceState = (state) => state.usersReducer

export default reducer
export const { addNewUser, getUserInfo, addUserInfo, userLogout } = actions


