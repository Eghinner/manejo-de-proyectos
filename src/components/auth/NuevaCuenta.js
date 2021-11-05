import React, {useState} from 'react'
import { Link } from 'react-router-dom'

const NuevaCuenta = () => {

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

	}

	return (
		<div className="form-usuario">
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