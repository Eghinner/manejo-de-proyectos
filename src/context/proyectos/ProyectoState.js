import React, {useReducer} from 'react'
import ProyectContext from './ProyectContext.js'
import ProyectoReducer from './proyectoReducer.js'

import {Formulario_proyecto,
	Obtener_proyecto,
	Agregar_proyecto,
	Actual_proyecto,
	Eliminar_proyecto,
	Proyecto_error
} from '../../types'
import ClienteAxios from '../../config/axios.js'
// _________________________________________________________________________
const ProyectoState = ({children}) => {

	const initialState = {
		proyectos : [],
		formulario: false,
		proyecto: null,
		mensaje: null
	}

	const [state, dispatch] = useReducer(ProyectoReducer, initialState)

	const showFormulario = () => {
		dispatch({
			type: Formulario_proyecto
		})
	}
// _________________________________________________________________________
	const obtenerProyectos = async () => {
		try {
			const resultado = await ClienteAxios.get('/api/proyectos')
			// console.log(resultado)
			dispatch({
				type: Obtener_proyecto,
				payload: resultado.data.proyectos
			})
		} catch (error) {
			const alerta = {
				msg: 'Hubo un error',
				categoria: 'alerta-error'
			}
			dispatch({
				type: Proyecto_error,
				payload: alerta
			})
		}
	}
// _________________________________________________________________________
	const agregarProyecto = async (proyecto) => {
		try {
			const resultado = await ClienteAxios.post('/api/proyectos', proyecto)
			// console.log(resultado)

			dispatch({
				type: Agregar_proyecto,
				payload: resultado.data
			})
		} catch (error) {
			const alerta = {
				msg: 'Hubo un error',
				categoria: 'alerta-error'
			}
			dispatch({
				type: Proyecto_error,
				payload: alerta
			})
		}
	}
// _________________________________________________________________________
	const actualProyecto = proyectoId => {
		dispatch({
			type: Actual_proyecto,
			payload: proyectoId
		})
	}
// _________________________________________________________________________
	const elminarProyecto = async proyectoId => {
		try {
			await ClienteAxios.delete(`/api/proyectos/${proyectoId}`)
			dispatch({
				type: Eliminar_proyecto,
				payload: proyectoId
			})
		} catch (error) {
			const alerta = {
				msg: 'Hubo un error',
				categoria: 'alerta-error'
			}
			dispatch({
				type: Proyecto_error,
				payload: alerta
			})
		}
	}

	return (
		<ProyectContext.Provider
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
		</ProyectContext.Provider>
	)
}

export default ProyectoState