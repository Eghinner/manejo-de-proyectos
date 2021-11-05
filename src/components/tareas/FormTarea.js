import React from 'react'

const FormTarea = () => {
	return (
		<div className="formulario">
			<form>
				<div className="contenedor-input">
					<input
						className="input-text"
						placeholder="NombreTarea"
						type="text"
						name="nombre"
					/>
				</div>
				<div className="contenedor-input">
					<input
						className="btn btn-primario btn-block"
						type="submit"
					/>
				</div>
			</form>
		</div>
	)
}

export default FormTarea