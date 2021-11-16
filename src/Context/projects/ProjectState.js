import React, {useReducer} from 'react'
import ProjectContext from './ProjectContext.js'
import ProjectReducer from './projectReducer.js'

import {
	FORM_PROYECT,
	GET_PROYECT,
	ADD_PROYECT,
	CURRENT_PROYECT,
	DELETE_PROYECT,
	ERROR_PROYECT
} from '../../Types'

import ClienteAxios from '../../Config/axios.js'
// _________________________________________________________________________
const ProyectoState = ({children}) => {

	const initialState = {
		proyectos : [],
		formulario: false,
		proyecto: null,
		mensaje: null
	}

	const [state, dispatch] = useReducer(ProjectReducer, initialState)

	const showFormulario = () => {
		dispatch({
			type: FORM_PROYECT
		})
	}
// _________________________________________________________________________
	const obtenerProyectos = async () => {
		try {
			const resultado = await ClienteAxios.get('/api/proyectos')
			dispatch({
				type: GET_PROYECT,
				payload: resultado.data.proyectos
			})
		} catch (error) {
			const alerta = {
				msg: 'Hubo un error',
				categoria: 'alerta-error'
			}
			dispatch({
				type: ERROR_PROYECT,
				payload: alerta
			})
		}
	}
// _________________________________________________________________________
	const agregarProyecto = async (proyecto) => {
		try {
			const resultado = await ClienteAxios.post('/api/proyectos', proyecto)
			dispatch({
				type: ADD_PROYECT,
				payload: resultado.data
			})
		} catch (error) {
			const alerta = {
				msg: 'Hubo un error',
				categoria: 'alerta-error'
			}
			dispatch({
				type: ERROR_PROYECT,
				payload: alerta
			})
		}
	}
// _________________________________________________________________________
	const actualProyecto = proyectoId => {
		dispatch({
			type: CURRENT_PROYECT,
			payload: proyectoId
		})
	}
// _________________________________________________________________________
	const elminarProyecto = async proyectoId => {
		try {
			await ClienteAxios.delete(`/api/proyectos/${proyectoId}`)
			dispatch({
				type: DELETE_PROYECT,
				payload: proyectoId
			})
		} catch (error) {
			const alerta = {
				msg: 'Hubo un error',
				categoria: 'alerta-error'
			}
			dispatch({
				type: ERROR_PROYECT,
				payload: alerta
			})
		}
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
				elminarProyecto
			}}
		>
			{children}
		</ProjectContext.Provider>
	)
}

export default ProyectoState