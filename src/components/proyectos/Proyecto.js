import React from 'react'

const Proyecto = ({proyecto}) => {
	return (
		<li>
			<button
				type="button"
				className="btn btn-blank"
			>
				{proyecto}
			</button>
		</li>
	)
}

export default Proyecto