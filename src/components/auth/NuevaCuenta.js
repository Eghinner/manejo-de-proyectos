import React, {useState, useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import AlertaContext from '../../context/alertas/AlertaContext.js'
import AuthContext from '../../context/authenticacion/AuthContext.js'

const NuevaCuenta = props => {

	// Extraer valores del context
	const alertcontext = useContext(AlertaContext)
	const {alerta, mostrarAlerta} = alertcontext

	const authcontext = useContext(AuthContext)
	const {mensaje, autenticado, registrarUsuario} = authcontext

	// Por si muchos acaso
	useEffect(() => {
		if (autenticado) {
			props.history.push('/proyectos')
		}
		if (mensaje) {
			mostrarAlerta(mensaje.msg, mensaje.categoria)
		}
	}, [mensaje, autenticado, props.history])

	const [usuario, setUsuario] = useState({
		nombre: '',
		email: '',
		password: '',
		repassword: ''
	})

	const {nombre, email, password, repassword} = usuario

	const handleChange = e => {
		// Guardar cambios
		setUsuario({
			...usuario,
			[e.target.name] : e.target.value
		})
	}

	const handleSubmit = e => {
		e.preventDefault()

		// Validar
		if (nombre.trim()===''||
			email.trim()===''||
			password.trim()===''||
			repassword.trim()==='') {

			mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
			return
		}
		// password min 6
		if (password.length < 6) {
			mostrarAlerta('La contraseña debe ser minimo de 6 caracteres', 'alerta-error')
			return
		}
		// Confirmar
		if (password!==repassword) {
			mostrarAlerta('La confirmación no es igual', 'alerta-error')
			return
		}

		// Registro
		registrarUsuario({nombre, email, password})


	}

	return (
		<div className="form-usuario">
			{ alerta ?
				<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
				: null
			}
			<div className="contenedor-form sombra-dark">
				<h1>Crea una cuenta</h1>
				<form
					onSubmit={handleSubmit}
				>
					<div className="campo-form">
						<label htmlFor="nombre">Nombre</label>
						<input
							type="text"
							id="nombre"
							name="nombre"
							placeholder="Jhon"
							onChange={handleChange}
							value={nombre}
						/>
					</div>
					<div className="campo-form">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							name="email"
							placeholder="example@gmail.com"
							onChange={handleChange}
							value={email}
						/>
					</div>
					<div className="campo-form">
						<label htmlFor="password">Contraseña</label>
						<input
							type="password"
							id="password"
							name="password"
							onChange={handleChange}
							value={password}
							placeholder="contraseña"
						/>
					</div>
					<div className="campo-form">
						<label htmlFor="repassword">Confirmar contraseña</label>
						<input
							type="password"
							id="repassword"
							name="repassword"
							onChange={handleChange}
							value={repassword}
							placeholder="contraseña"
						/>
					</div>
					<div className="campo-form">
						<input
							className="btn btn-primario btn-block"
							type="submit"
							value="Registrar"
						/>
					</div>
				</form>
				<Link to={'./'} className="enlace-cuenta">
					Ingresar
				</Link>
			</div>
		</div>
	)
}

export default NuevaCuenta