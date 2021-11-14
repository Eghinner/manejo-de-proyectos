import React, {useContext} from 'react'
import Tarea from './Tarea.js'
import ProyectContext from '../../context/proyectos/ProyectContext.js'
import TareaContext from '../../context/tareas/TareaContext.js'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import Swal from 'sweetalert2'

const ListadoTarea = () => {

	const context = useContext(ProyectContext)
	const {proyecto, elminarProyecto} = context

	const contextTareas = useContext(TareaContext)
	const {tareasproyecto} = contextTareas


	if (!proyecto) {
		return (<h2>Selecciona un proyecto</h2>)
	}

	const eliminarProyect = () => {
		Swal.fire({
			title: '¿Estas seguro de eliminar este proyecto?',
			text: "No se puede revertir",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, seguro',
			cancelButtonText: 'Cancelar'
		}).then((result) => {
			if (result.isConfirmed) {
				elminarProyecto(proyecto._id)
				Swal.fire(
					'Borrado',
					'Proyecto eliminado con exito',
					'success'
					)
			}
		})
	}

	return (
		<React.Fragment>
			<h2>Proyecto: {proyecto===null?null:proyecto.name}</h2>
			<ul className="listado-tareas">
				{ tareasproyecto === null
					? (<li className="tarea"><p>No hay tareas</p></li>)
					:
					<TransitionGroup >
						{
							tareasproyecto.map(task=>(
								<CSSTransition
									key={task._id}
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
				onClick={eliminarProyect}
			>Eliminar Proyecto</button>
		</React.Fragment>
	)
}

export default ListadoTarea