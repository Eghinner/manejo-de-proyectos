import React, {useContext} from 'react'
import ProjectContext from '../../../Context/projects/ProjectContext.js'
import TaskContext from '../../../Context/tasks/TaskContext.js'
import './styles.css'

const Project = ({proyecto}) => {

	const context = useContext(ProjectContext)
	const tareacontext = useContext(TaskContext)

	const {actualProyecto} = context
	const {obtenerTareas} = tareacontext

	const showProyect = id => {
		actualProyecto(id)
		obtenerTareas(id)
	}

	const mostrarProyecto = () => {
		showProyect(proyecto._id)
	}

	return (
		<li>
			<button
				type="button"
				className="btn btn-blank proyecto"
				onClick={mostrarProyecto}
			>
				{proyecto.name}
			</button>
		</li>
	)
}

export default Project