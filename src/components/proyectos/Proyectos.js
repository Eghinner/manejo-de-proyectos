import React, {useContext, useEffect} from 'react'
import Sidebar from '../layout/Sidebar.js'
import Barra from '../layout/Barra.js'
import FormTarea from '../tareas/FormTarea.js'
import ListadoTarea from '../tareas/ListadoTarea.js'
import AuthContext from '../../context/authenticacion/AuthContext.js'

const Proyectos = () => {

	// Extraer la info de auth
	const context = useContext(AuthContext)
	const {usuarioAuth} = context

	useEffect(() => {
		usuarioAuth()
		// eslint-disable-next-line
	}, [])

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