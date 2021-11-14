import React, {useContext, useEffect} from 'react'
import AuthContext from '../../context/authenticacion/AuthContext.js'
import TareaContext from '../../context/tareas/TareaContext.js'

const Barra = () => {

	// Extraer la info de auth
	const context = useContext(AuthContext)
	const {usuario, usuarioAuth, cerrarSesion} = context

	const contextTask = useContext(TareaContext)
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

export default Barra