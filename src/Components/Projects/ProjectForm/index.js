import React, {useState, useContext, useEffect} from 'react'
import {ProjectContext} from '../../../Context/ProjectContext.js'
import Spinner from '../../Layout/Spinner'

import './styles.css'


const ProjectForm = () => {

	const [loading, setLoad] = useState(false)

	const context = useContext(ProjectContext)
	const {formulario, proyectos, showFormulario, agregarProyecto} = context

	const [proyecto, setProyecto] = useState({
		name: ''
	})

	const {name} = proyecto


	const handleChange = e => {
		setProyecto({
			...proyecto,
			[e.target.name] : e.target.value
		})
	}

	const handleSubmit = e => {
		e.preventDefault()

		// Validar
		if (name.trim()==='') return

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