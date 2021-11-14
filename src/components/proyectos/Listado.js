import React, {useContext, useEffect} from 'react'
import Proyecto from './Proyecto.js'
import ProyectContext from '../../context/proyectos/ProyectContext.js'
import AlertaContext from '../../context/alertas/AlertaContext.js'

const Listado = () => {

	const contextP = useContext(ProyectContext)
	const {mensaje, proyectos, obtenerProyectos} = contextP

	const contextA = useContext(AlertaContext)
	const {alerta, mostrarAlerta} = contextA

	useEffect(() => {
		// Si hay un error
		if (mensaje) {
			mostrarAlerta(mensaje.msg, mensaje.categoria)
		}
		obtenerProyectos()
		// eslint-disable-next-line
	}, [mensaje, proyectos])

	if (proyectos.length === 0) return (<p>No hay proyectos</p>)

	return (
		<ul className="listado-proyectos">
			{
				alerta
			?
				<div className={`alerta ${alerta.categoria}`}
					>{alerta.msg}
				</div>
			:null
			}
				{proyectos.map(proyecto=>(
						<Proyecto
							key={proyecto._id}
							proyecto={proyecto}
						/>
				))}
		</ul>
	)
}

export default Listado