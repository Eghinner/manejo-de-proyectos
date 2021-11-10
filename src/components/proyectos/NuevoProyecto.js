import React, {useState, useContext} from 'react'
import ProyectContext from '../../context/proyectos/ProyectContext.js'


const NuevoProyecto = () => {

	const context = useContext(ProyectContext)
	const {formulario, showFormulario, agregarProyecto} = context

	const [proyecto, setProyecto] = useState({
		// id: '',
		name: ''
	})

	const {name} = proyecto


	const handleChange = e => {
		setProyecto({
			...proyecto,
			[e.target.name] : e.target.value
		})
	}

	const handleSubmit = e => {
		e.preventDefault()

		// Validar
		if (name.trim()==='') return

		// Agregar proyecto al context
		agregarProyecto(proyecto)
		// Vaciar input
		setProyecto({
			name: ''
		})
	}

	const mostrar = () => {
		showFormulario()
	}

	// console.log(proyecto)

	return (
		<React.Fragment>
			<button
				type="button"
				className="btn btn-block btn-primario"
				onClick={mostrar}
			>
				Nuevo Proyecto
			</button>
			{
				formulario ?
				(
					<form
					className="formulario-nuevo-proyecto"
					onSubmit={handleSubmit}
					>
					<input
						className="input-text"
						placeholder="Nombre del proyecto"
						type="text"
						name="name"
						value={name}
						onChange={handleChange}
					/>
					<input
						type="submit"
						className="btn btn-primario btn-block"
						value="Agegar Proyecto"
					/>
					</form>
				)
				:null
			}
		</React.Fragment>
	)
}

export default NuevoProyecto