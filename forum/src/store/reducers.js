
import { combineReducers } from "redux"
import usersReducer from "./usersSlice"
import postsSlice from "./postsSlice"

const rootReducer = combineReducers({
	usersReducer,
	postsSlice
})

export default rootReducer