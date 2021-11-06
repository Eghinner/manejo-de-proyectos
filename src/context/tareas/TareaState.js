import React, {useReducer} from 'react'
import TareaContext from './TareaContext.js'
import tareaReducer from './tareaReducer.js'
import { v4 as uuidv4 } from 'uuid'

import {
	Tareas_proyecto,
	Agregar_tarea,
	Eliminar_tarea,
	Estado_tarea,
	Seleccionar_tarea,
	Actualizar_tarea
} from '../../types'

const TareaState = ({children}) => {
	const initialState = {
		tareas: [
		{id: 1,name: 'Buga Buga', estado: true, proyectid: 1},
		{id: 2,name: 'Huge Huge', estado: false, proyectid: 1},
		{id: 3,name: 'Baba Baba', estado: true, proyectid: 1},
		{id: 4,name: 'Maca Maca', estado: false, proyectid: 1}
		],
		tareasproyecto: null,
		taraseleccionada: null
	}

	const [state, dispatch] = useReducer(tareaReducer, initialState)

	const obtenerTareas = Id => {
		dispatch({
			type: Tareas_proyecto,
			payload: Id
		})
	}

	const agreagrTarea = tarea => {
		tarea.id = uuidv4()
		dispatch({
			type: Agregar_tarea,
			payload: tarea
		})
	}

	const eliminarTarea = id => {
		dispatch({
			type: Eliminar_tarea,
			payload: id
		})
	}

	const estadoTarea = tarea => {
		dispatch({
			type: Estado_tarea,
			payload: tarea
		})
	}

	const seleccionarTarea = tarea => {
		dispatch({
			type: Seleccionar_tarea,
			payload: tarea
		})
	}

	const actualizarTarea = tarea => {
		dispatch({
			type: Actualizar_tarea,
			payload: tarea
		})
	}

	return (
		<TareaContext.Provider
			value={{
				tareas: state.tareas,
				tareasproyecto: state.tareasproyecto,
				taraseleccionada: state.taraseleccionada,

				obtenerTareas,
				agreagrTarea,
				eliminarTarea,
				estadoTarea,
				seleccionarTarea,
				actualizarTarea
			}}
		>
			{children}
		</TareaContext.Provider>
	)
}

export default TareaState