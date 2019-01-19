import Vue from 'vue'
import Vuex from 'vuex'

import main from './modules/main'
import auth from './modules/auth'
import VueCookie from 'vue-cookie'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    main,
    auth
  }
})

const token = VueCookie.get('token')
store.commit('auth/LOGIN', { token })

export default store
