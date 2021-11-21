import React from 'react'
import Sidebar from '../../Layout/Sidebar'
import Bar from '../../Layout/Bar'
import TaskForm from '../../Tasks/TaskForm'
import TaskList from '../../Tasks/TaskList'

import './styles.css'

const Projects = () => {

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