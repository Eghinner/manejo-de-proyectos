import React, {useContext, useEffect} from 'react'
import { Route, Redirect } from 'react-router-dom'
import {AuthContext} from '../../Context/AuthContext.js'

const RouteProjects = ({component: Component, ...props}) => {

	const context = useContext(AuthContext)
	const {autenticado, usuarioAuth} = context
	const token = localStorage.getItem('token')

	useEffect(() => {
		if (token && !autenticado){
			// if (!autenticado) {
				usuarioAuth()
			// }
		}
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

export default RouteProjects
