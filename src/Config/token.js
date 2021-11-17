import ClienteAxios from './axios.js'

const tokenAuth = token => {
	if(token) {
		ClienteAxios.defaults.headers.common['x-auth-token'] = token
	} else {
		delete ClienteAxios.defaults.headers.common['x-auth-token']
	}
}

export default tokenAuth