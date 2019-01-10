import auth from '../../api/auth'
import jwtDecode from 'jwt-decode'

const state = {
  token: null,
  role: null
}
const getters = {
  role (state) {
    return state.role
  },
  name (state) {
    return state.token != null ? jwtDecode(state.token).name : null
  },
  email (state) {
    return state.token != null ? jwtDecode(state.token).sub : null
  }
}
const mutations = {
  LOGIN (state, {token}) {
    if (!token) return
    const jwt = jwtDecode(token)

    const exp = jwt.exp + '000'
    const now = Date.now()

    if (parseInt(exp) > now) {
      state.token = token
      localStorage.token = token
      auth.setAuthInHeader(token)
      state.role = jwt.role
    } else {
      state.token = null
      delete localStorage.token
      auth.setAuthInHeader(null)
    }
  },
  LOGOUT (state) {
    state.token = null
    delete localStorage.token
    auth.setAuthInHeader(null)
  }
}
const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
