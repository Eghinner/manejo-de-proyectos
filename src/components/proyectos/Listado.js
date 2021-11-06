import React, {useContext, useEffect} from 'react'
import Proyecto from './Proyecto.js'
import ProyectContext from '../../context/proyectos/ProyectContext.js'
import {CSSTransition, TransitionGroup} from 'react-transition-group'


const Listado = () => {

	const context = useContext(ProyectContext)

	const {proyectos, obtenerProyectos} = context

	useEffect(() => {
		obtenerProyectos()
		// eslint-disable-next-line
	}, [])

	if (proyectos.length === 0) return (<p>No hay proyectos</p>)

	return (
		<ul className="listado-proyectos">
			<TransitionGroup>
				{proyectos.map(proyecto=>(
					<CSSTransition
						key={proyecto.id}
						timeout={200}
						classNames="proyecto"
					>
						<Proyecto
							proyecto={proyecto}
						/>
					</CSSTransition>
				))}
			</TransitionGroup>
		</ul>
	)
}

export default Listado