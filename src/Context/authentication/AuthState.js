import React, {useReducer} from 'react'
import AuthContext from './AuthContext.js'
import authReducer from './authReducer.js'

import ClienteAxios from '../../Config/axios.js'
import tokenAuth from '../../Config/token.js'

import {
	REGISTER_SECCESS,
	REGISTER_ERROR,
	GET_USER,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	CLOSE_SESSION
} from '../../Types'

const AuthState = ({children}) => {
	const initialState = {
		token: localStorage.getItem('token'),
		autenticado: null,
		usuario: null,
		mensaje: null
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
			usuarioAuth()
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
			usuarioAuth()
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
		dispatch({
			type: CLOSE_SESSION
		})
	}

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				autenticado: state.autenticado,
				usuario: state.usuario,
				mensaje: state.mensaje,
				registrarUsuario,
				iniciarSesion,
				usuarioAuth,
				cerrarSesion
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthState