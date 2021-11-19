import React, {useState, useContext, useEffect} from 'react'
import {ProjectContext} from '../../../Context/ProjectContext.js'
import {AlertContext} from '../../../Context/AlertContext.js'
import Spinner from '../../Layout/Spinner'

import './styles.css'


const ProjectForm = () => {

	const [loading, setLoad] = useState(false)

	const context = useContext(ProjectContext)
	const {formulario, proyectos, showFormulario, agregarProyecto} = context

	// Extraer valores del context
	const alertcontext = useContext(AlertContext)
	const {mostrarAlerta} = alertcontext

	const [proyecto, setProyecto] = useState({
		name: ''
	})

	const {name} = proyecto

	const token = localStorage.getItem('token')

	const handleChange = e => {
		setProyecto({
			...proyecto,
			[e.target.name] : e.target.value
		})
	}

	const handleSubmit = e => {
		e.preventDefault()

		// Validar
		if (name.trim()==='') {
			mostrarAlerta('No ingresar projecto vacio', 'alerta-error')
			return
		}

		if (!token) {
			mostrarAlerta('Error de validación', 'alerta-error')
			return
		}

		// mostrar cargando
		setLoad(true)

		// Agregar proyecto al context
		agregarProyecto(proyecto)
		// Vaciar input
		setProyecto({
			name: ''
		})
	}

	const mostrar = () => {
		showFormulario()
	}

	useEffect(() => {
		setLoad(false)
	}, [proyectos])

	return (
		<React.Fragment>
			<button
				type="button"
				className="btn btn-block btn-primario"
				onClick={mostrar}
			>
				Nuevo Proyecto
			</button>

			{ loading ? <Spinner/> : null }
			{
				formulario ?
				(
					<form
					className="formulario-nuevo-proyecto"
					onSubmit={handleSubmit}
					>
					<input
						className="input-text"
						placeholder="Nombre del proyecto"
						type="text"
						name="name"
						value={name}
						onChange={handleChange}
					/>
					<input
						type="submit"
						className="btn btn-primario btn-block"
						value="Agregar Proyecto"
					/>
					</form>
				)
				:null
			}
		</React.Fragment>
	)
}

export default ProjectForm