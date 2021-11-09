import React, {useReducer} from 'react'
import AlertaContext from './AlertaContext.js'
import alertaReducer from './alertaReducer.js'

import {
	Mostrar_alerta,
	Ocultar_alerta
} from '../../types/index.js'

const AlertaState = ({children}) => {
	const initialState = {
		alerta: null
	}

	const [state, dispatch] = useReducer(alertaReducer, initialState)

	// Funciones
	const mostrarAlerta = (msg, categoria) => {
		dispatch({
			type: Mostrar_alerta,
			payload: {
				msg,
				categoria
			}
		})

		setTimeout(()=>{
			dispatch({
				type: Ocultar_alerta
			})
		}, 5000)
	}

	return (
		<AlertaContext.Provider
			value={{
				alerta: state.alerta,
				mostrarAlerta
			}}
		>
			{children}
		</AlertaContext.Provider>
	)
}

export default AlertaState