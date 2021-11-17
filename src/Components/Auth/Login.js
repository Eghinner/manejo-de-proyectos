import React, {useState,useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {AlertContext} from '../../Context/AlertContext.js'
import {AuthContext} from '../../Context/AuthContext.js'
import Spinner from '../Layout/Spinner'
import './styles.css'

const Login = props => {

	// Cargando
	const [loading, setLoad] = useState(false)

	// Extraer valores del context
	const alertcontext = useContext(AlertContext)
	const {alerta, mostrarAlerta} = alertcontext

	const authcontext = useContext(AuthContext)
	const {mensaje, autenticado, iniciarSesion} = authcontext

	// Por si muchos acaso
	useEffect(() => {
		if (autenticado) {
			props.history.push('/proyectos')
		}
		if (mensaje) {
			mostrarAlerta(mensaje.msg, mensaje.categoria)
		}
		// eslint-disable-next-line
	}, [mensaje, autenticado, props.history])

	const [usuario, setUsuario] = useState({
		email: '',
		password: ''
	})

	const {email, password} = usuario

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
		if (email.trim()===''||password.trim()==='') {
			mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
			return
		}
		// password min 6
		if (password.length < 6) {
			mostrarAlerta('La contraseña es incorrecta', 'alerta-error')
			return
		}
		setLoad(true)

		// Pasar datos
		iniciarSesion({email, password})
	}

	return (
		<div className="form-usuario">
			{ loading ? <Spinner/> : null }
			{ alerta ?
				<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
				: null
			}
			<div className="contenedor-form sombra-dark">
				<h1>Iniciar Sesión</h1>
				<form
					onSubmit={handleSubmit}
				>
					<div className="campo-form">
						<label htmlFor="email">Email</label>
						<input
							className="input-text"
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
							className="input-text"
							type="password"
							id="password"
							name="password"
							placeholder="contraseña"
							onChange={handleChange}
							value={password}
						/>
					</div>
					<div className="campo-form">
						<input
							className="btn btn-primario btn-block"
							type="submit"
							value="Entrar"
						/>
					</div>
				</form>
				<Link to={'./nueva-cuenta'} className="enlace-cuenta">
					Abrir nueva cuenta
				</Link>
			</div>
		</div>
	)
}

export default Login