import {
	Tareas_proyecto,
	Agregar_tarea,
	Eliminar_tarea,
	Estado_tarea,
	Seleccionar_tarea,
	Actualizar_tarea
} from '../../types'

const tareaReducer = (state, action) => {
	switch(action.type) {
		case Tareas_proyecto:
			return {
				...state,
				tareasproyecto: state.tareas.filter(tarea=>
					tarea.proyectid===action.payload)
			}
		case Agregar_tarea:
			return {
				...state,
				tareas: [action.payload,...state.tareas]
			}
		case Eliminar_tarea:
			return {
				...state,
				tareas: state.tareas.filter(tarea=>
					tarea.id!==action.payload)
			}
		case Actualizar_tarea:
			case Estado_tarea:
				return {
					...state,
					tareas: state.tareasproyecto.map(tarea=>
						tarea.id===action.payload.id?action.payload:tarea),
					taraseleccionada: null
				}
			case Seleccionar_tarea:
				return {
					...state,
					taraseleccionada: action.payload
				}

		default:
			return state
	}
}

export default tareaReducer