import React, {useState, useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import AlertContext from '../../Context/Alerts/AlertContext.js'
import AuthContext from '../../Context/authentication/AuthContext.js'
import Spinner from '../Layout/Spinner'
import ReactTooltip from 'react-tooltip'
import './styles.css'

const Register = props => {

	const [loading, setLoad] = useState(false)

	// Extraer valores del context
	const alertcontext = useContext(AlertContext)
	const {alerta, mostrarAlerta} = alertcontext

	const authcontext = useContext(AuthContext)
	const {mensaje, autenticado, registrarUsuario} = authcontext

	useEffect(() => {
		if (mensaje) {
			mostrarAlerta(mensaje.msg, mensaje.categoria)
		}
	// eslint-disable-next-line
	}, [mensaje, autenticado])

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

	function IsEmail(email_test) {
		return /^[a-z0-9]+\.?\w*@[a-z]+(\.\w{2,3})?\.\w{2,4}$/.test(email_test);
	}

	const submitNueva = (e) => {
		e.preventDefault()

		// Validar
		if (nombre.trim()===''||
			email.trim()===''||
			password.trim()===''||
			repassword.trim()==='') {

			mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
			return
		}


		if (!IsEmail(email)) {
			mostrarAlerta('El formato de correo es incorrecto', 'alerta-error')
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

		setLoad(true)

		// Registro
		registrarUsuario({nombre, email, password})
	}
	return (
		<div className="form-usuario">
			{ loading ? <Spinner/> : null }
			{ alerta
				? <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
				: null
			}
			<div className="contenedor-form sombra-dark">
				<h1>Crea una cuenta</h1>
				<form
					onSubmit={submitNueva}
				>
					<div className="campo-form">
						<label htmlFor="nombre">Nombre</label>
						<input
							className="input-text"
							type="text"
							id="nombre"
							name="nombre"
							placeholder="Agregar nombre"
							onChange={handleChange}
							value={nombre}
						/>
					</div>
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
					<div className="campo-form"
						data-tip="La contraseña debe contener un minimo de 6 caracteres"
					>
						<label htmlFor="password">Contraseña</label>
						<input
							className="input-text"
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
							className="input-text"
							type="password"
							id="repassword"
							name="repassword"
							onChange={handleChange}
							value={repassword}
							placeholder="confirme su contraseña"
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
			<ReactTooltip place="top" type="info" effect="float"/>
		</div>
	)
}

export default Register