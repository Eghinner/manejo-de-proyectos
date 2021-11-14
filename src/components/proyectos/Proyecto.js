import React, {useContext} from 'react'
import ProyectContext from '../../context/proyectos/ProyectContext.js'
import TareaContext from '../../context/tareas/TareaContext.js'

const Proyecto = ({proyecto}) => {

	const context = useContext(ProyectContext)
	const tareacontext = useContext(TareaContext)

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

export default Proyecto