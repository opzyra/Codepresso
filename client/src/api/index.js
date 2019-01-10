import axios from 'axios'
import router from '../router'

const Unauthorized = 401
const onUnauthorized = () => {
  router.push(`/login?rPath=${encodeURIComponent(location.pathname)}`)
}

const request = {
  domain: '/api',
  get (path) {
    return axios.get(`${this.domain + path}`)
      .catch(({response}) => {
        const {status} = response
        if (status === Unauthorized) return onUnauthorized()
        throw Error(response)
      })
  },
  post (path, data) {
    return axios.post(`${this.domain + path}`, data)
  },
  delete (path) {
    return axios.delete(`${this.domain + path}`)
  },
  put (path, data) {
    return axios.put(`${this.domain + path}`, data)
  }
}

export default request
