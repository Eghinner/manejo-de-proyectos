import React from 'react'
import Sidebar from '../layout/Sidebar.js'
import Barra from '../layout/Barra.js'
import FormTarea from '../tareas/FormTarea.js'
import ListadoTarea from '../tareas/ListadoTarea.js'

const Proyectos = () => {
	return (
		<div className="contenedor-app">
			<Sidebar/>
			<div className="seccion-principal">
				<Barra/>
				<main>
					<FormTarea/>
					<div className="contenedor-tareas">
						<ListadoTarea/>
					</div>
				</main>
			</div>
		</div>
	)
}

export default Proyectos