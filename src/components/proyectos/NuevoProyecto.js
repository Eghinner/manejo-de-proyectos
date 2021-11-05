import React, {useState, useContext} from 'react'
import ProyectContext from '../../context/proyectos/ProyectContext.js'

const NuevoProyecto = () => {

	const context = useContext(ProyectContext)
	const {formulario, showFormulario} = context

	const [proyecto, setProyecto] = useState({
		nombre: ''
	})

	const {nombre} = proyecto

	const handleSubmit = e => {
		e.preventDefault()
	}

	const handleChange = e => {
		setProyecto({
			...proyecto,
			[e.target.name] : e.target.value
		})
	}

	return (
		<React.Fragment>
			<button
				type="button"
				className="btn btn-block btn-primario"
				onClick={()=>showFormulario()}
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
						name="nombre"
						value={nombre}
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