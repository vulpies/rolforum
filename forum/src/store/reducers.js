import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import { apiSlice } from "./apiSlice"
import usersReducer from "./usersSlice"

export const store = configureStore({
	reducer: {
		usersReducer,
		[apiSlice.reducerPath]: apiSlice.reducer
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: process.env.NODE_ENV !== 'production'
})

setupListeners(store.dispatch)