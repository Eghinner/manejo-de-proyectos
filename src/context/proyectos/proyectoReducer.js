import {Formulario_proyecto, Obtener_proyecto} from '../../types'

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

		default:
			return state
	}
}

export default ProyectoReducer