import {
	Registro_exitoso,
	Registro_error,
	Obtener_usuario,
	Login_exitoso,
	Login_error,
	Cerrar_sesion
} from '../../types/index.js'

const authReducer = (state, action) => {
	switch (action.type){
		case Registro_exitoso:
		case Login_exitoso:
			localStorage.setItem('token', action.payload.token)
			return {
				...state,
				autenticado: true,
				mensaje: null,
				cargando: false
			}
		case Cerrar_sesion:
		case Login_error:
		case Registro_error:
		localStorage.removeItem('token')
			return {
				...state,
				token: null,
				usuario: null,
				autenticado: null,
				mensaje: action.payload,
				cargando: false
			}
		case Obtener_usuario:
			return {
				...state,
				autenticado: true,
				usuario: action.payload,
				cargando: false
			}
		default:
			return state
	}
}

export default authReducer