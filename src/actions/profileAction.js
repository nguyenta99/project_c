import { peckPortalClient } from "../api";
import Cookies from "universal-cookie";

export const loadProfile = () => dispatch => {
	dispatch({
		type: 'LOADING_STATE_UPDATED',
		state: 'loading',
		resource: 'currentUser'
	})

	const cookie = new Cookies()
	let token = cookie.get('token')
	let header = {}
	if (token) {
		token = 'Bearer ' + token
		header['Authorization'] = token
	}

	return peckPortalClient.get('/api/v1/profile', { headers: header }).then(response => {
		dispatch({
			type: 'PROFILE_LOADING_SUCCESS',
			payload: {
				user: response.data.user
			}
		})

		dispatch({
			type: 'LOADING_STATE_UPDATED',
			resource: 'currentUser',
			state: 'success'
		})
	}).catch(error => {
		dispatch({
			type: 'LOADING_STATE_UPDATED',
			resource: 'currentUser',
			state: 'failed'
		})
	})
}