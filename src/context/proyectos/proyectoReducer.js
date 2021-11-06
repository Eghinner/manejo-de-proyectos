import {Formulario_proyecto,
		Obtener_proyecto,
		Agregar_proyecto,
		Actual_proyecto,
		Eliminar_proyecto
} from '../../types'

const ProyectoReducer = (state, action) => {
	switch(action.type) {
		case Formulario_proyecto:
			return {
				...state,
				formulario: true
			}
		case Obtener_proyecto:
			return {
				...state,
				proyectos: action.payload
			}
		case Agregar_proyecto:
			return {
				...state,
				proyectos: [...state.proyectos, action.payload],
				formulario: false
			}
		case Actual_proyecto:
			return {
				...state,
				proyecto: state.proyectos.filter(proyecto=>
					proyecto.id === action.payload)[0]
			}
		case Eliminar_proyecto:
			return {
				...state,
				proyectos: state.proyectos.filter(proyecto=>
					proyecto.id !== action.payload),
				proyecto: null
			}

		default:
			return state
	}
}

export default ProyectoReducer