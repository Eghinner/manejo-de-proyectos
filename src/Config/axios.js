import axios from 'axios'

const ClienteAxios = axios.create({
	baseURL: 'https://safe-citadel-23578.herokuapp.com/'
})

export default ClienteAxios