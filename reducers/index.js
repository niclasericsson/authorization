import { combineReducers } from 'redux'
import {user, userIsLoading, userHasErrored} from './userReducer'

export default combineReducers({
	user,
	userIsLoading,
	userHasErrored
})