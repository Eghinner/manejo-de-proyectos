import React, { useContext, useState, useEffect } from 'react'
import ProjectContext from '../../../Context/projects/ProjectContext.js'
import TaskContext from '../../../Context/tasks/TaskContext.js'
import Spinner from '../../Layout/Spinner'

import './styles.css'

const TaskForm = () => {

	const [loading, setLoad] = useState(false)

	const context = useContext(ProjectContext)
	const {proyecto} = context

	const tareacontext = useContext(TaskContext)
	const {taraseleccionada, tareasproyecto, agreagrTarea, actualizarTarea} = tareacontext

	const [tarea, setTarea] = useState({
		name: ''
	})
	const {name} = tarea

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
		if (name.trim()==='') return

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