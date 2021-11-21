import {createContext, useReducer} from 'react'
import {
	FORM_PROJECT,
	GET_PROJECT,
	ADD_PROJECT,
	CURRENT_PROJECT,
	DELETE_PROJECT,
	ERROR_PROJECT,
	RESET
} from '../Types'

import ClienteAxios from '../Config/axios.js'

export const ProjectContext = createContext()

const ProjectState = ({children}) => {

	const initialState = {
		proyectos : [],
		formulario: false,
		proyecto: null,
		mensaje: null
	}

	const ProjectReducer = (state, action) => {
		switch(action.type) {
			case FORM_PROJECT:
				return {
					...state,
					formulario: true
				}
			case GET_PROJECT:
				return {
					...state,
					proyectos: action.payload
				}
			case ADD_PROJECT:
				return {
					...state,
					proyectos: [...state.proyectos, action.payload],
					formulario: false
				}
			case CURRENT_PROJECT:
				return {
					...state,
					proyecto: state.proyectos.filter(proyecto=>
						proyecto._id === action.payload)[0]
				}
			case DELETE_PROJECT:
				return {
					...state,
					proyectos: state.proyectos.filter(proyecto=>
						proyecto._id !== action.payload),
					proyecto: null
				}
			case ERROR_PROJECT:
				return {
					...state,
					mensaje: action.payload
				}
			case RESET:
				return {
					...state,
					proyectos : [],
					formulario: false,
					proyecto: null,
					mensaje: null
				}
			default:
				return state
		}
	}

	const [state, dispatch] = useReducer(ProjectReducer, initialState)

	const showFormulario = () => {
		dispatch({
			type: FORM_PROJECT
		})
	}
// _________________________________________________________________________
	const obtenerProyectos = async () => {
		try {
			const resultado = await ClienteAxios.get('/api/proyectos')
			dispatch({
				type: GET_PROJECT,
				payload: resultado.data.proyectos
			})
		} catch (error) {
			const alerta = {
				msg: 'Hubo un error',
				categoria: 'alerta-error'
			}
			dispatch({
				type: ERROR_PROJECT,
				payload: alerta
			})
		}
	}
// _________________________________________________________________________
	const agregarProyecto = async (proyecto) => {
		try {

			const resultado = await ClienteAxios.post('/api/proyectos', proyecto)
			dispatch({
				type: ADD_PROJECT,
				payload: resultado.data
			})
		} catch (error) {
			const alerta = {
				msg: 'Hubo un error',
				categoria: 'alerta-error'
			}
			dispatch({
				type: ERROR_PROJECT,
				payload: alerta
			})
		}
	}
// _________________________________________________________________________
	const actualProyecto = proyectoId => {
		dispatch({
			type: CURRENT_PROJECT,
			payload: proyectoId
		})
	}
// _________________________________________________________________________
	const elminarProyecto = async proyectoId => {
		try {
			await ClienteAxios.delete(`/api/proyectos/${proyectoId}`)
			dispatch({
				type: DELETE_PROJECT,
				payload: proyectoId
			})
		} catch (error) {
			const alerta = {
				msg: 'Hubo un error',
				categoria: 'alerta-error'
			}
			dispatch({
				type: ERROR_PROJECT,
				payload: alerta
			})
		}
	}

	const resetProjects = () => {
		dispatch({
			type: RESET
		})
	}

	return (
		<ProjectContext.Provider
			value={{
				proyectos: state.proyectos,
				formulario: state.formulario,
				proyecto: state.proyecto,
				mensaje: state.mensaje,
				showFormulario,
				obtenerProyectos,
				agregarProyecto,
				actualProyecto,
				elminarProyecto,
				resetProjects
			}}
		>
			{children}
		</ProjectContext.Provider>
	)
}

export default ProjectState