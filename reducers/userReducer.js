export function userIsLoading(state = false, action){
	if(action.type === 'USER_IS_LOADING'){
		return action.isLoading
	}
	return state
}

export function userHasErrored(state = false, action){
	if(action.type === 'USER_FETCH_ERROR'){
		return action.hasErrored
	}
	return state
}

export function user(state = null, action){
	switch (action.type){
		case 'USER_FETCH_SUCCESS':
			return action.user
		default:
			if(state == null)
				return null

			return {
				...state
			}
	}
}
