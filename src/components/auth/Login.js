import React, {useState} from 'react'
import { Link } from 'react-router-dom'

const Login = () => {

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

	}

	return (
		<div className="form-usuario">
			<div className="contenedor-form sombra-dark">
				<h1>Iniciar Sesión</h1>
				<form
					onSubmit={handleSubmit}
				>
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
						/>
					</div>
					<div className="campo-form">
						<input
							className="btn btn-primario btn-block"
							type="submit"
							value="Log In"
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