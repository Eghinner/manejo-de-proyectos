import React, {createContext, useReducer, useContext} from 'react'
import ClienteAxios from '../Config/axios.js'
import tokenAuth from '../Config/token.js'
import {TaskContext} from './TaskContext.js'
import {ProjectContext} from './ProjectContext.js'

import {
	REGISTER_SECCESS,
	REGISTER_ERROR,
	GET_USER,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	CLOSE_SESSION,
	SET_LOADING
} from '../Types'

export const AuthContext = createContext()

const AuthState = ({children}) => {

	const {resetTareas} = useContext(TaskContext)
	const {resetProjects} = useContext(ProjectContext)

	const initialState = {
		token: localStorage.getItem('token'),
		autenticado: null,
		usuario: null,
		mensaje: null,
		loading: false
	}

	const authReducer = (state, action) => {
		switch (action.type){
			case REGISTER_SECCESS:
			case LOGIN_SUCCESS:
				localStorage.setItem('token', action.payload.token)
				return {
					...state,
					autenticado: true,
					mensaje: null,
					loading: true
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
					mensaje: action.payload,
					loading: false
				}
			case GET_USER:
				return {
					...state,
					autenticado: true,
					usuario: action.payload,
					loading: true
				}
			case SET_LOADING:
				return {
					loading: action.payload
				}
			default:
				return state
		}
	}

	const [state, dispatch] = useReducer(authReducer, initialState)

	// Funciones
// ------------------------------------------------------------------------
	const registrarUsuario = async datos => {
		try{
			const respuesta = await ClienteAxios.post('api/usuarios', datos)

			dispatch({
				type: REGISTER_SECCESS,
				payload: respuesta.data
			})

			// Optener el usuario
			// usuarioAuth()
		} catch(error) {
			const alerta = {
				msg: error.response.data.msg,
				categoria: 'alerta-error'
			}

			dispatch({
				type: REGISTER_ERROR,
				payload: alerta
			})
		}
	}
// -------------------------------------------------------------------------
	// Retorna el ususario autenticado
	const usuarioAuth = async() => {
		const token = localStorage.getItem('token')
		if (token) {
			// Enviar token por header
			tokenAuth(token)
		}

		try {
			const respuesta = await ClienteAxios.get('/api/auth')
			dispatch({
				type: GET_USER,
				payload: respuesta.data.usuario
			})
		} catch (error) {
			dispatch({
				type: LOGIN_ERROR
			})
		}
	}
// ------------------------------------------------------------------------
	const iniciarSesion = async datos => {
		try {
			const respuesta = await ClienteAxios.post('/api/auth', datos)
			dispatch({
				type: LOGIN_SUCCESS,
				payload: respuesta.data
			})

			// Optener el usuario
			// usuarioAuth()
		} catch (error) {
			console.log(error.response.data.msg)
			const alerta = {
				msg: error.response.data.msg,
				categoria: 'alerta-error'
			}

			dispatch({
				type: REGISTER_ERROR,
				payload: alerta
			})
		}
	}

	const cerrarSesion = () => {
		resetTareas()
		resetProjects()
		dispatch({
			type: CLOSE_SESSION
		})
	}

	const setLoading = bool => {
		dispatch({
			type: SET_LOADING,
			payload: bool
		})
	}

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				autenticado: state.autenticado,
				usuario: state.usuario,
				mensaje: state.mensaje,
				loading: state.loading,
				registrarUsuario,
				iniciarSesion,
				usuarioAuth,
				cerrarSesion,
				setLoading
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthState