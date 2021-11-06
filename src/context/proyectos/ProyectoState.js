import React, {useReducer} from 'react'
import ProyectContext from './ProyectContext.js'
import ProyectoReducer from './proyectoReducer.js'
import { v4 as uuidv4 } from 'uuid'

import {Formulario_proyecto,
		Obtener_proyecto,
		Agregar_proyecto,
		Actual_proyecto,
		Eliminar_proyecto
	} from '../../types'


const ProyectoState = ({children}) => {

	const proyectos = [
	{id: 1, name: 'Reina de los confesores'},
	{id: 2, name: 'Reina de las virgenes'},
	{id: 3, name: 'Reina de todos los santos'},
	{id: 4, name: 'Reina concebida sin pecados'},
	{id: 5, name: 'Reina concebida sin pecados'}
	]

	const initialState = {
		proyectos : [],
		formulario: false,
		proyecto: null
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

	const agregarProyecto = proyecto => {
		proyecto.id = uuidv4()
		dispatch({
			type: Agregar_proyecto,
			payload: proyecto
		})
	}

	const actualProyecto = proyectoId => {
		dispatch({
			type: Actual_proyecto,
			payload: proyectoId
		})
	}

	const elminarProyecto = proyectoId => {
		dispatch({
			type: Eliminar_proyecto,
			payload: proyectoId
		})
	}

	return (
		<ProyectContext.Provider
			value={{
				proyectos: state.proyectos,
				formulario: state.formulario,
				proyecto: state.proyecto,
				showFormulario,
				obtenerProyectos,
				agregarProyecto,
				actualProyecto,
				elminarProyecto
				}}
		>
			 {children}
		</ProyectContext.Provider>
	)
}

export default ProyectoState