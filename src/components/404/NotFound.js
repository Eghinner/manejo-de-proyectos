import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'

const NotFound = () => (
	<div className="container">
		<div className="contenedor">
			<h1>404 - Not Found!</h1>
			<Link to="/">Go Home</Link>
		</div>
 	</div>
)

export default NotFound