import React, {useReducer} from 'react'
import ProyectContext from './ProyectContext.js'
import ProyectoReducer from './proyectoReducer.js'

import {Formulario_proyecto, Obtener_proyecto} from '../../types'


const ProyectoState = ({children}) => {

	const proyectos = [
	{id: 1, name: 'Reina de los confesores'},
	{id: 2, name: 'Reina de las virgenes'},
	{id: 3, name: 'Reina de todos los santos'},
	{id: 4, name: 'Reina concebida sin pecados'}
	]

	const initialState = {
		proyectos : [],
		formulario: false
	}

	const [state, dispatch] = useReducer(ProyectoReducer, initialState)

	const showFormulario = () => {
		dispatch({
			type: Formulario_proyecto
		})
	}

	const obtenerProyectos = () => {
		dispatch({
			type: Obtener_proyecto,
			payload: proyectos
		})
	}

	return (
		<ProyectContext.Provider
			value={{
				proyectos: state.proyectos,
				formulario: state.formulario,
				showFormulario,
				obtenerProyectos
				}}
		>
			 {children}
		</ProyectContext.Provider>
	)
}

export default ProyectoState