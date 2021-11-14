import React, {useContext, useEffect} from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthContext from '../../context/authenticacion/AuthContext.js'

const RutaProyectos = ({component: Component, ...props}) => {

	const context = useContext(AuthContext)
	const {autenticado, usuarioAuth} = context

	useEffect(() => {
		usuarioAuth()
		// eslint-disable-next-line
	}, [])

	return (
		<Route
			{...props} render={ props => !autenticado
				? ( <Redirect to='/'/> ) : ( <Component {...props}/> )
			}
		/>
	)
}

export default RutaProyectos
