import React, {useContext, useEffect} from 'react'
import Sidebar from '../../Layout/Sidebar'
import Bar from '../../Layout/Bar'
import TaskForm from '../../Tasks/TaskForm'
import TaskList from '../../Tasks/TaskList'
import {AuthContext} from '../../../Context/AuthContext.js'

import './styles.css'

const Projects = () => {

	// Extraer la info de auth
	const context = useContext(AuthContext)
	const {usuarioAuth} = context

	useEffect(() => {
		usuarioAuth()
		// eslint-disable-next-line
	}, [])

	return (
		<div className="contenedor-app">
			<Sidebar/>
			<div className="seccion-principal">
				<Bar/>
				<main>
					<TaskForm/>
					<div className="contenedor-tareas">
						<TaskList/>
					</div>
				</main>
			</div>
		</div>
	)
}

export default Projects