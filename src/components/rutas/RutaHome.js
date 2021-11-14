import React,{useContext, useEffect} from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthContext from '../../context/authenticacion/AuthContext.js'
import tokenAuth from '../../config/token.js'

const RutaHome = ({component: Component, ...props}) => {

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

export default RutaHome