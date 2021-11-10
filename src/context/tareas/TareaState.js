import React, {useReducer} from 'react'
import TareaContext from './TareaContext.js'
import tareaReducer from './tareaReducer.js'

import {
	Tareas_proyecto,
	Agregar_tarea,
	Eliminar_tarea,
	Seleccionar_tarea,
	Actualizar_tarea
} from '../../types'

import ClienteAxios from '../../config/axios.js'

const TareaState = ({children}) => {
	const initialState = {
		tareasproyecto: [],
		taraseleccionada: null
	}

	const [state, dispatch] = useReducer(tareaReducer, initialState)

	const obtenerTareas = async proyecto => {
		try {
			const resultado = await ClienteAxios.get('/api/tareas', {params:{proyecto}})
			dispatch({
				type: Tareas_proyecto,
				payload: resultado.data.tareas
			})
		} catch (error) {
			console.log(error)
		}
	}

	const agreagrTarea = async tarea => {
		try {
			const resultado = await ClienteAxios.post('/api/tareas', tarea)
			// console.log(resultado)
			// console.log(tarea)
			dispatch({
				type: Agregar_tarea,
				payload: resultado.data.tarea
			})
		} catch (error) {
			console.log(error)
		}
	}

	const eliminarTarea = async (id, proyecto) => {
		try {
			await ClienteAxios.delete(`/api/tareas/${id}`, {params: {proyecto}})
			dispatch({
				type: Eliminar_tarea,
				payload: id
			})
		} catch (error) {
			console.log(error)
		}
	}

	const actualizarTarea = async tarea => {
		try {
			const resultado = await ClienteAxios.put(`/api/tareas/${tarea._id}`, tarea)
			dispatch({
				type: Actualizar_tarea,
				payload: resultado.data.tarea
			})
		} catch (error) {
			console.log(error)
		}
	}

	const seleccionarTarea = tarea => {
		dispatch({
			type: Seleccionar_tarea,
			payload: tarea
		})
	}

	return (
		<TareaContext.Provider
			value={{
				// tareas: state.tareas,
				tareasproyecto: state.tareasproyecto,
				taraseleccionada: state.taraseleccionada,

				obtenerTareas,
				agreagrTarea,
				eliminarTarea,
				seleccionarTarea,
				actualizarTarea
			}}
		>
			{children}
		</TareaContext.Provider>
	)
}

export default TareaState