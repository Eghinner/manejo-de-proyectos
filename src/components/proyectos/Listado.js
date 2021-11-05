import React, {useContext, useEffect} from 'react'
import Proyecto from './Proyecto.js'
import ProyectContext from '../../context/proyectos/ProyectContext.js'

const Listado = () => {

	const context = useContext(ProyectContext)

	const {proyectos, obtenerProyectos} = context

	useEffect(() => {
		obtenerProyectos()
	}, [])

	if (proyectos.length === 0) return null

	return (
		<ul className="listado-proyectos">
			{proyectos.map(proyecto=>(
				<Proyecto
					key={proyecto.id}
					proyecto={proyecto.name}
				/>
			))}
		</ul>
	)
}

export default Listado