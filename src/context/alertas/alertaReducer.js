import {
	Mostrar_alerta,
	Ocultar_alerta
} from '../../types/index.js'

const alertaReducer = (state,action) => {
	switch(action.type) {
		case Mostrar_alerta:
			return {
				alerta: action.payload
			}
		case Ocultar_alerta:
			return {
				alerta: null
			}

		default:
			return state
	}
}
export default alertaReducer