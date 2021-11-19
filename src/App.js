import React from 'react'

// Componentes
import Register from './Components/Auth/Register'
import Login from './Components/Auth/Login'
import Projects from './Components/Projects/Projects'
import NotFound from './Components/NotFound'


import ProjectState from './Context/ProjectContext.js'
import TaskState from './Context/TaskContext.js'
import AlertState from './Context/AlertContext.js'
import AuthState from './Context/AuthContext.js'

// Proteccion de rutas
import RouteProjects from './Components/Routes/RouteProjects.js'
import RouteHome from './Components/Routes/RouteHome.js'

// Router dom v5
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const App = () => {

  return (
    <ProjectState>
     <TaskState>
      <AlertState>
          <AuthState>
          <Router>
            <Switch>
              <RouteHome exact path='/' component={Login}/>
              <RouteHome exact path='/nueva-cuenta' component={Register}/>
              <RouteProjects exact path='/proyectos' component={Projects}/>
              <Route path='*'>
                <NotFound />
              </Route>
            </Switch>
          </Router>
          </AuthState>
      </AlertState>
     </TaskState>
    </ProjectState>
  )
}

export default App;