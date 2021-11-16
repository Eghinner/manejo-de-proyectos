import React, {useContext, useEffect} from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthContext from '../../Context/authentication/AuthContext.js'
import tokenAuth from '../../Config/token.js'

const RouteHome = ({component: Component, ...props}) => {

	const context = useContext(AuthContext)
	const {autenticado, usuarioAuth} = context

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token){
			tokenAuth(token)
			usuarioAuth()
		}
		// eslint-disable-next-line
	}, [])

	return (
		<Route
			{...props} render={ props => autenticado
				? ( <Redirect to='/proyectos'/> ) : ( <Component {...props}/> )
			}
		/>
	)
}

export default RouteHome