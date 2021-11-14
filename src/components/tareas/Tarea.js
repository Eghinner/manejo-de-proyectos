import React, {useContext} from 'react'
import ProyectContext from '../../context/proyectos/ProyectContext.js'
import TareaContext from '../../context/tareas/TareaContext.js'
import Swal from 'sweetalert2'

const Tarea = ({task}) => {

	const context = useContext(ProyectContext)
	const {proyecto} = context

	const tareacontext = useContext(TareaContext)
	const {eliminarTarea, obtenerTareas, actualizarTarea, seleccionarTarea} = tareacontext

	const eliminar = id => {
		eliminarTarea(id, proyecto._id)
		obtenerTareas(proyecto._id)
	}

	const cambiarEstado = tarea => {
		if (tarea.estado) {
			tarea.estado = false
		} else {
			tarea.estado = true
		}

		actualizarTarea(tarea)
	}

	const selecTarea = tarea => {
		seleccionarTarea(tarea)
	}

	const eliminarTask = () => {
			Swal.fire({
			title: '¿Estas seguro de eliminar esta tarea?',
			text: "No se puede revertir",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, seguro',
			cancelButtonText: 'Cancelar'
		}).then((result) => {
			if (result.isConfirmed) {
				eliminar(task._id)
				Swal.fire(
					'Borrado',
					'Tarea eliminado con exito',
					'success'
				)
			}
		})
	}

	return (
		<li className="tarea sombra">
			<p>{task.name}</p>
			<div className="estado">
				{ task.estado
					? <button
						type="button"
						className="completo"
						onClick={()=>cambiarEstado(task)}
					>Completo
					</button>
					: <button
						type="button"
						className="incompleto"
						onClick={()=>cambiarEstado(task)}
					>Incompleto
					</button>
				}
			</div>

			<div className="acciones">
				<button
					type="button"
					className="btn btn-primario"
					onClick={()=>selecTarea(task)}
				>Editar
				</button>
				<button
					type="button"
					className="btn btn-secundario"
					onClick={eliminarTask}
				>Eliminar</button>
			</div>
		</li>
	)
}

export default Tarea