import React from 'react'
import NuevoProyecto from '../proyectos/NuevoProyecto.js'
import Listado from '../proyectos/Listado.js'
// import './layout.css'

const Sidebar = () => {
	return (
		<aside>
			<h1>MERN<span>Proyectos</span></h1>
			<NuevoProyecto/>
			<div className="proyectos">
				<h2>Tus proyectos</h2>
				<Listado/>
			</div>
		</aside>
	)
}

export default Sidebar