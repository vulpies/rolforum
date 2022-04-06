import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	posts: [],
	post: [],
	auth: true
}

const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		getAllPosts: (state, action) => {
			state.posts = action.payload
		},
		addNewPost: (state, action) => {
			state.posts = [...state.posts, state.posts.push(action.payload)]
		},
		getLastPost: (state, action) => {
			state.post = state.posts.find((n) => n.id === action.payload)
		},
	},
})

const { actions, reducer } = postsSlice

export default reducer
export const { addNewPost, getAllPosts, getLastPost } = actions


