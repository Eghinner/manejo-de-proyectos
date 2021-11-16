import {
	TASKS_PROYECT,
	ADD_TASK,
	DELETE_TASK,
	SELECT_TASK,
	UPTDATE_TASK,
	RESET_TASK
} from '../../Types'

const tareaReducer = (state, action) => {
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
				tareasproyecto: []
			}
		default:
			return state
	}
}

export default tareaReducer