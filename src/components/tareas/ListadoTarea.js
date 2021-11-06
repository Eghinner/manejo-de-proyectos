import React, {useContext} from 'react'
import Tarea from './Tarea.js'
import ProyectContext from '../../context/proyectos/ProyectContext.js'
import TareaContext from '../../context/tareas/TareaContext.js'
import {CSSTransition, TransitionGroup} from 'react-transition-group'

const ListadoTarea = () => {

	const context = useContext(ProyectContext)
	const {proyecto, elminarProyecto} = context

	const contextTareas = useContext(TareaContext)
	const {tareasproyecto} = contextTareas


	if (!proyecto) {
		return (<h2>Selecciona un proyecto</h2>)
	}

	return (
		<React.Fragment>
			<h2>Proyecto: {proyecto.name}</h2>
			<ul className="listado-tareas">
				{ tareasproyecto === null
					? (<li className="tarea"><p>No ha tareas</p></li>)
					:
					<TransitionGroup >
						{
							tareasproyecto.map(task=>(
								<CSSTransition
									key={task.id}
									timeout={200}
									classNames="tarea"
								>
									<Tarea
										task={task}
									/>
								</CSSTransition>
								))
						}
					</TransitionGroup>
				}
			</ul>
			<button
				type="button"
				className="btn btn-eliminar"
				onClick={()=>elminarProyecto(proyecto.id)}
			>Eliminar Proyecto &times;</button>
		</React.Fragment>
	)
}

export default ListadoTarea