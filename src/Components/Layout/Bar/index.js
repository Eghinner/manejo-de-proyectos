import React, {useContext, useEffect} from 'react'
import {AuthContext} from '../../../Context/AuthContext.js'
import {TaskContext} from '../../../Context/TaskContext.js'

import './styles.css'

const Bar = () => {

	// Extraer la info de auth
	const context = useContext(AuthContext)
	const {usuario, usuarioAuth, cerrarSesion} = context

	const contextTask = useContext(TaskContext)
	const {resetTareas} = contextTask

	useEffect(() => {
		usuarioAuth()
		// eslint-disable-next-line
	}, [])

	const close = () => {
		resetTareas()
		cerrarSesion()
	}

	return (
		<header className="app-header">
			{
				usuario?
				<p className="nombre-usuario">Hola, <span>{usuario.nombre}</span></p>
				:null
			}
			<nav className="nav-principal">
				<button
					className="btn btn-blan cerrar-sesion"
					onClick={close}
				>Cerrar Sesión
				</button>
			</nav>
		</header>
	)
}

export default Bar