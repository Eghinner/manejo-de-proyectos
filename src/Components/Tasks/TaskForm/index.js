import React, { useContext, useState, useEffect } from 'react'
import {ProjectContext} from '../../../Context/ProjectContext.js'
import {TaskContext} from '../../../Context/TaskContext.js'
import {AlertContext} from '../../../Context/AlertContext.js'
import Spinner from '../../Layout/Spinner'

import './styles.css'

const TaskForm = () => {

	const [loading, setLoad] = useState(false)

	const context = useContext(ProjectContext)
	const {proyecto} = context

	const tareacontext = useContext(TaskContext)
	const {taraseleccionada, tareasproyecto, agreagrTarea, actualizarTarea} = tareacontext

	// Extraer valores del context
	const alertcontext = useContext(AlertContext)
	const {mostrarAlerta} = alertcontext

	const [tarea, setTarea] = useState({
		name: ''
	})
	const {name} = tarea

	// Token existente
	const token = localStorage.getItem('token')

	useEffect(() => {
		if (taraseleccionada!==null) {
			setTarea(taraseleccionada)
		} else {
			setTarea({
				name: ''
			})
		}
	}, [taraseleccionada])

	const handleChange = e => {
		setTarea({
			...tarea,
			[e.target.name]: e.target.value
		})
	}

	const handleSubmit = e => {
		e.preventDefault()
		// Validacion
		if (name.trim()==='') {
			mostrarAlerta('No ingresar tarea vacia', 'alerta-error')
			return
		}

		if (!token) {
			mostrarAlerta('Error de validación', 'alerta-error')
			return
		}

		setLoad(true)

		// Condicional onSubmit agregar
		if (taraseleccionada === null) {
			tarea.proyecto = proyecto._id
			tarea.estado = false
			agreagrTarea(tarea)
		// Condicional onSubmit editar
		} else {
			actualizarTarea(tarea)
		}

		// Resetear input
		setTarea({
			name:''
		})
	}

	useEffect(() => {
		setLoad(false)
	}, [tareasproyecto])



	if (!proyecto) {
		return null
	}

	return (
		<div className="formulario">
			{ loading ? <Spinner/> : null }

			<form
				onSubmit={handleSubmit}
			>
				<div className="contenedor-input">
					<input
						className="input-text"
						placeholder="NombreTarea"
						type="text"
						name="name"
						value={name}
						onChange={handleChange}
					/>
				</div>
				<div className="contenedor-input">
					<input
						className="btn btn-primario btn-block"
						type="submit"
						value={taraseleccionada===null?'Agregar tarea':'Editar tarea'}
					/>
				</div>
			</form>
		</div>
	)
}

export default TaskForm