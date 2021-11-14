import React, {useReducer} from 'react'
import AuthContext from './AuthContext.js'
import authReducer from './authReducer.js'

import ClienteAxios from '../../config/axios.js'
import tokenAuth from '../../config/token.js'

import {
	Registro_exitoso,
	Registro_error,
	Obtener_usuario,
	Login_exitoso,
	Login_error,
	Cerrar_sesion
} from '../../types/index.js'

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
				type: Registro_exitoso,
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
				type: Registro_error,
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
				type: Obtener_usuario,
				payload: respuesta.data.usuario
			})
		} catch (error) {
			dispatch({
				type: Login_error
			})
		}
	}
// ------------------------------------------------------------------------
	const iniciarSesion = async datos => {
		try {
			const respuesta = await ClienteAxios.post('/api/auth', datos)
			dispatch({
				type: Login_exitoso,
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
				type: Registro_error,
				payload: alerta
			})
		}
	}

	const cerrarSesion = () => {
		dispatch({
			type: Cerrar_sesion
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