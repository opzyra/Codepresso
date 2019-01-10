import Vue from 'vue'
import Vuex from 'vuex'

import main from './modules/main'
import auth from './modules/auth'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    main,
    auth
  }
})

const { token } = localStorage
store.commit('auth/LOGIN', { token })

export default store
