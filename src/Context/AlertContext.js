import React, {useReducer, createContext} from 'react'

import {
	SHOW_ALERT,
	HIDE_ALERT
} from '../Types'

export const AlertContext = createContext()

const AlertaState = ({children}) => {
	const initialState = {
		alerta: null
	}

	const alertaReducer = (state,action) => {
		switch(action.type) {
			case SHOW_ALERT:
				return {
					alerta: action.payload
				}
			case HIDE_ALERT:
				return {
					alerta: null
				}

			default:
				return state
		}
	}

	const [state, dispatch] = useReducer(alertaReducer, initialState)

	// Funciones
	const mostrarAlerta = (msg, categoria) => {
		dispatch({
			type: SHOW_ALERT,
			payload: {
				msg,
				categoria
			}
		})

		setTimeout(()=>{
			dispatch({
				type: HIDE_ALERT
			})
		}, 5000)
	}

	return (
		<AlertContext.Provider
			value={{
				alerta: state.alerta,
				mostrarAlerta
			}}
		>
			{children}
		</AlertContext.Provider>
	)
}

export default AlertaState