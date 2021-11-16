import React from 'react'
import ProjectForm from '../../Projects/ProjectForm'
import ProjectList from '../../Projects/ProjectList'

import './styles.css'

const Sidebar = () => {
	return (
		<aside>
			<h1>REACT<span>Proyectos</span></h1>
			<ProjectForm/>
			<div className="proyectos">
				<h2>Tus proyectos</h2>
				<ProjectList/>
			</div>
		</aside>
	)
}

export default Sidebar