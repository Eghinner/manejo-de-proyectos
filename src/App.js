import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import NuevaCuenta from './components/auth/NuevaCuenta.js'
import Login from './components/auth/Login.js'
import Proyectos from './components/proyectos/Proyectos.js'

import ProyectoState from './context/proyectos/ProyectoState.js'
import TareaState from './context/tareas/TareaState.js'

function App() {
  return (
    <ProyectoState>
  	<TareaState>
  		<Router>
  			<Switch>
  				<Route exact path='/' component={Login}/>
  				<Route exact path='/nueva-cuenta' component={NuevaCuenta}/>
  				<Route exact path='/proyectos' component={Proyectos}/>
  			</Switch>
  		</Router>
    </TareaState>
    </ProyectoState>
  )
}

export default App;
