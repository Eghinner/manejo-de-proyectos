import {
	Tareas_proyecto,
	Agregar_tarea,
	Eliminar_tarea,
	Seleccionar_tarea,
	Actualizar_tarea,
	Resetear_tarea
} from '../../types'

const tareaReducer = (state, action) => {
	switch(action.type) {
		case Tareas_proyecto:
			return {
				...state,
				tareasproyecto: action.payload
			}
		case Agregar_tarea:
			return {
				...state,
				tareasproyecto: [action.payload,...state.tareasproyecto]
			}
		case Eliminar_tarea:
			return {
				...state,
				tareasproyecto: state.tareasproyecto.filter(tarea=>
					tarea._id!==action.payload)
			}
		case Actualizar_tarea:
				return {
					...state,
					tareasproyecto: state.tareasproyecto.map(tarea=>
						tarea._id===action.payload._id?action.payload:tarea),
					taraseleccionada: null
				}
			case Seleccionar_tarea:
				return {
					...state,
					taraseleccionada: action.payload
				}
			case Resetear_tarea:
				return {
					...state,
					tareasproyecto: []
				}
		default:
			return state
	}
}

export default tareaReducer