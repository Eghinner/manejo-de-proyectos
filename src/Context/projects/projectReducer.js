import {
		FORM_PROYECT,
		GET_PROYECT,
		ADD_PROYECT,
		CURRENT_PROYECT,
		DELETE_PROYECT,
		ERROR_PROYECT
} from '../../Types'

const ProyectoReducer = (state, action) => {
	switch(action.type) {
		case FORM_PROYECT:
			return {
				...state,
				formulario: true
			}
		case GET_PROYECT:
			return {
				...state,
				proyectos: action.payload
			}
		case ADD_PROYECT:
			return {
				...state,
				proyectos: [...state.proyectos, action.payload],
				formulario: false
			}
		case CURRENT_PROYECT:
			return {
				...state,
				proyecto: state.proyectos.filter(proyecto=>
					proyecto._id === action.payload)[0]
			}
		case DELETE_PROYECT:
			return {
				...state,
				proyectos: state.proyectos.filter(proyecto=>
					proyecto._id !== action.payload),
				proyecto: null
			}
		case ERROR_PROYECT:
			return {
				...state,
				mensaje: action.payload
			}
		default:
			return state
	}
}

export default ProyectoReducer