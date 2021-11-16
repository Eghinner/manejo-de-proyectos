import {
	REGISTER_SECCESS,
	REGISTER_ERROR,
	GET_USER,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	CLOSE_SESSION
} from '../../Types'

const authReducer = (state, action) => {
	switch (action.type){
		case REGISTER_SECCESS:
		case LOGIN_SUCCESS:
			localStorage.setItem('token', action.payload.token)
			return {
				...state,
				autenticado: true,
				mensaje: null
			}
		case CLOSE_SESSION:
		case LOGIN_ERROR:
		case REGISTER_ERROR:
		localStorage.removeItem('token')
			return {
				...state,
				token: null,
				usuario: null,
				autenticado: null,
				mensaje: action.payload
			}
		case GET_USER:
			return {
				...state,
				autenticado: true,
				usuario: action.payload
			}
		default:
			return state
	}
}

export default authReducer