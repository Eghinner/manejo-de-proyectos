import React, {useContext, useEffect} from 'react'
import AuthContext from '../../context/authenticacion/AuthContext.js'

const Barra = () => {

	// Extraer la info de auth
	const context = useContext(AuthContext)
	const {usuario, usuarioAuth, cerrarSesion} = context

	useEffect(() => {
		usuarioAuth()
		// eslint-disable-next-line
	}, [])

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
					onClick={()=>cerrarSesion()}
				>Cerrar Sesión
				</button>
			</nav>
		</header>
	)
}

export default Barra