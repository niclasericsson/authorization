//import { AsyncStorage, Alert } from "react-native";
//import I18n from 'ex-react-native-i18n';
//import { unsubscribeForPushNotifications } from '../config/pushnotifications';
//import { getSite } from "../config/auth";

export function userIsLoading(bool) {
	return {
		type: 'USER_IS_LOADING',
		isLoading: bool
	}
}

export function userFetchDataSuccess(user){
	return {
		type: 'USER_FETCH_SUCCESS',
		user
	}
}

export function userFetchError(hasErrored){
	return {
		type: 'USER_FETCH_ERROR',
		hasErrored: hasErrored
	}
}

export function userFetchData(username, password){
	return (dispatch) => {
		dispatch(userIsLoading(true))




		fetch('/login', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: "username=" + encodeURIComponent(username) + "&passwd=" + encodeURIComponent(password)
        })
        .then((response)=>{
			if(!response.ok){
				console.log('failed!')
				throw Error(response.statusText)
			}		
			return response
        })
        .then((response) => response.json())
        .then((data)=>{
        	const p1 = new Promise((resolve, reject)=>{
	        	AsyncStorage.multiSet([['jwt', data.jwt], ['user', JSON.stringify(data.user)]])
	        	.then((err)=> {	        		
	        		resolve(data)
	        	})
	        })
        	return p1
        })        	
        .then((data)=>{        	        	
            dispatch(userFetchDataSuccess(data.user))
            dispatch(userIsLoading(false))                		
        })
        .catch(()=>{
        	dispatch(userFetchError(true))
        	dispatch(userIsLoading(false))
        })
	}
}

export function userClearData(){
	return (dispatch) => {
		console.log('clear data')
	}
}