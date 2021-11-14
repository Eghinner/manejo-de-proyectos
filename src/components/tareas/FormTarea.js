import React, {useContext, useState, useEffect} from 'react'
import ProyectContext from '../../context/proyectos/ProyectContext.js'
import TareaContext from '../../context/tareas/TareaContext.js'
import Spinner from '../layout/Spinner.js'

const FormTarea = () => {

	const [loading, setLoad] = useState(false)

	const context = useContext(ProyectContext)
	const {proyecto} = context

	const tareacontext = useContext(TareaContext)
	const {taraseleccionada,tareasproyecto, agreagrTarea, obtenerTareas, actualizarTarea} = tareacontext

	const [tarea, setTarea] = useState({
		name: ''
	})
	const {name} = tarea

	useEffect(() => {
		if (taraseleccionada!==null) {
			setTarea(taraseleccionada)
		} else {
			setTarea({
				name: ''
			})
		}
	}, [taraseleccionada])

	const handleChange = e => {
		setTarea({
			...tarea,
			[e.target.name]: e.target.value
		})
	}

	const handleSubmit = e => {
		e.preventDefault()
		// Validacion
		if (name.trim()==='') return

		setLoad(true)

		// Condicional onSubmit agregar
		if (taraseleccionada === null) {
			tarea.proyecto = proyecto._id
			tarea.estado = false
			// console.log(tarea)
			agreagrTarea(tarea)
		// Condicional onSubmit editar
		} else {
			actualizarTarea(tarea)
		}

		// Cargar lista
		obtenerTareas(proyecto._id)
		// Resetear input
		setTarea({
			name:''
		})
	}

	useEffect(() => {
		setLoad(false)
	}, [tareasproyecto])



	if (!proyecto) {
		return null
	}

	return (
		<div className="formulario">

			{ loading ? <Spinner/> : null }

			<form
				onSubmit={handleSubmit}
			>
				<div className="contenedor-input">
					<input
						className="input-text"
						placeholder="NombreTarea"
						type="text"
						name="name"
						value={name}
						onChange={handleChange}
					/>
				</div>
				<div className="contenedor-input">
					<input
						className="btn btn-primario btn-block"
						type="submit"
						value={taraseleccionada===null?'Agregar tarea':'Editar tarea'}
					/>
				</div>
			</form>
		</div>
	)
}

export default FormTarea