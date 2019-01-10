import axios from 'axios'
import request from './'

const setAuthInHeader = token => {
  axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null
}

const getToken = token => {
  return request.post('/auth/token', { token })
}

export default {
  setAuthInHeader,
  getToken
}
