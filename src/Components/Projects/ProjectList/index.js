import React, {useContext, useEffect} from 'react'
import Project from '../Project'
import {ProjectContext} from '../../../Context/ProjectContext.js'
import {AlertContext} from '../../../Context/AlertContext.js'
import {AuthContext} from '../../../Context/AuthContext.js'

import './styles.css'

const ProjectList = () => {

	const contextP = useContext(ProjectContext)
	const {mensaje, proyectos, obtenerProyectos} = contextP

	const contextAlert = useContext(AlertContext)
	const {alerta, mostrarAlerta} = contextAlert

	const contextAuth = useContext(AuthContext)
	const {usuario} = contextAuth

	useEffect(() => {
		if (mensaje) {
			mostrarAlerta(mensaje.msg, mensaje.categoria)
		}
		// eslint-disable-next-line
	}, [mensaje])

	useEffect(() => {
		if (usuario) {
			obtenerProyectos()
		}

		// eslint-disable-next-line
	}, [usuario])

	if (proyectos.length === 0) return (<p>No hay proyectos</p>)

	return (
		<ul className="listado-proyectos">
			{
				alerta
			?
				<div className={`alerta ${alerta.categoria}`}
					>{alerta.msg}
				</div>
			:null
			}
				{proyectos.map(proyecto=>(
						<Project
							key={proyecto._id}
							proyecto={proyecto}
						/>
				))}
		</ul>
	)
}

export default ProjectList