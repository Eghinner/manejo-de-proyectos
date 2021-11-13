import React from 'react'

// Componentes
import NuevaCuenta from './components/auth/NuevaCuenta.js'
import Login from './components/auth/Login.js'
import Proyectos from './components/proyectos/Proyectos.js'

// States
import ProyectoState from './context/proyectos/ProyectoState.js'
import TareaState from './context/tareas/TareaState.js'
import AlertaState from './context/alertas/AlertaState.js'
import AuthState from './context/authenticacion/AuthState.js'

// Middleware
import RutaPrivada from './components/rutas/RutaPrivada.js'

// Router dom v5
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// token de autorizacion
import tokenAuth from './config/token.js'



// Revisar si tenemos token en global
const token = localStorage.getItem('token')
if (token) {
  tokenAuth(token)
}

function App() {
  return (
    <ProyectoState>
  	<TareaState>
      <AlertaState>
        <AuthState>
          <Router>
            <Switch>
              <Route exact path='/' component={Login}/>
              <Route exact path='/nueva-cuenta' component={NuevaCuenta}/>
              <RutaPrivada exact path='/proyectos' component={Proyectos}/>
            </Switch>
          </Router>
        </AuthState>
      </AlertaState>
    </TareaState>
    </ProyectoState>
  )
}

export default App;