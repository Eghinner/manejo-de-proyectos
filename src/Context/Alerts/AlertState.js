import React, {useReducer} from 'react'
import AlertContext from './AlertContext.js'
import alertReducer from './alertReducer.js'

import {
	SHOW_ALERT,
	HIDE_ALERT
} from '../../Types'

const AlertaState = ({children}) => {
	const initialState = {
		alerta: null
	}

	const [state, dispatch] = useReducer(alertReducer, initialState)

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