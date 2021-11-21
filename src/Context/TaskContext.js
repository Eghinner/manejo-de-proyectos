import {createContext, useReducer} from 'react'
import ClienteAxios from '../Config/axios.js'
import {
	TASKS_PROYECT,
	ADD_TASK,
	DELETE_TASK,
	SELECT_TASK,
	UPTDATE_TASK,
	RESET_TASK
} from '../Types'

export const TaskContext = createContext()

const TareaState = ({children}) => {
	const initialState = {
		tareasproyecto: [],
		taraseleccionada: null
	}

	const taskReducer = (state, action) => {
		switch(action.type) {
			case TASKS_PROYECT:
				return {
					...state,
					tareasproyecto: action.payload
				}
			case ADD_TASK:
				return {
					...state,
					tareasproyecto: [action.payload,...state.tareasproyecto]
				}
			case DELETE_TASK:
				return {
					...state,
					tareasproyecto: state.tareasproyecto.filter(tarea=>
						tarea._id!==action.payload)
				}
			case UPTDATE_TASK:
				return {
					...state,
					tareasproyecto: state.tareasproyecto.map(tarea=>
						tarea._id===action.payload._id?action.payload:tarea),
					taraseleccionada: null
					}
			case SELECT_TASK:
				return {
					...state,
					taraseleccionada: action.payload
				}
			case RESET_TASK:
				return {
					...state,
					tareasproyecto: [],
					taraseleccionada: null
				}
			default:
				return state
		}
	}


	const [state, dispatch] = useReducer(taskReducer, initialState)

	const obtenerTareas = async proyecto => {
		try {
			const resultado = await ClienteAxios.get('/api/tareas', {params:{proyecto}})
			dispatch({
				type: TASKS_PROYECT,
				payload: resultado.data.tareas
			})
		} catch (error) {
			console.log(error)
		}
	}

	const agreagrTarea = async tarea => {
		try {
			const resultado = await ClienteAxios.post('/api/tareas', tarea)
			dispatch({
				type: ADD_TASK,
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
				type: DELETE_TASK,
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
				type: UPTDATE_TASK,
				payload: resultado.data.tarea
			})
		} catch (error) {
			console.log(error)
		}
	}

	const seleccionarTarea = tarea => {
		dispatch({
			type: SELECT_TASK,
			payload: tarea
		})
	}

	const resetTareas = () => {
		dispatch({
			type: RESET_TASK
		})
	}

	return (
		<TaskContext.Provider
			value={{
				// tareas: state.tareas,
				tareasproyecto: state.tareasproyecto,
				taraseleccionada: state.taraseleccionada,

				obtenerTareas,
				agreagrTarea,
				eliminarTarea,
				seleccionarTarea,
				actualizarTarea,
				resetTareas
			}}
		>
			{children}
		</TaskContext.Provider>
	)
}

export default TareaState