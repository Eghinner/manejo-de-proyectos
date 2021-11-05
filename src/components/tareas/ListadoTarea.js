import React from 'react'
import Tarea from './Tarea.js'

const ListadoTarea = () => {

	const listado = [
		{name: 'Buga Buga', estado: true},
		{name: 'Huge Huge', estado: false},
		{name: 'Baba Baba', estado: true},
		{name: 'Maca Maca', estado: false}
	]

	return (
		<React.Fragment>
			<h2>Tiendita</h2>
			<ul className="listado-tareas">
				{ listado.length === 0
					? (<li className="tare"><p>No ha tareas</p></li>)
					: listado.map(task=>(
						<Tarea
							key={task.name}
							task={task}
						/>
						))
				}
			</ul>
			<button
				type="button"
				className="btn btn-eliminar"
			>Eliminar Proyecto &times;</button>
		</React.Fragment>
	)
}

export default ListadoTarea