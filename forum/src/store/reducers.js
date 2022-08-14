
import { configureStore } from "@reduxjs/toolkit"
// import { combineReducers } from "redux"
import { apiSlice } from "./apiSlice"
import usersReducer from "./usersSlice"

// const rootReducer = combineReducers({
// 	usersReducer,
// 	[apiSlice.reducerPath]: apiSlice.reducer
// })

const store = configureStore({
	reducer: {
		usersReducer,
		[apiSlice.reducerPath]: apiSlice.reducer
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: process.env.NODE_ENV !== 'production'
})

export default store