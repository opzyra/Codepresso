const state = {
  menu: [
    {
      name: 'Home',
      route: '/home'
    },
    {
      name: 'Work',
      route: '/work'
    },
    {
      name: 'Portfolio',
      route: '/portfolio'
    },
    {
      name: 'Devlog',
      route: '/devlog'
    },
    {
      name: 'Github',
      href: 'https://github.com/opzyra'
    }
  ],
  resumePublished: true,
  loading: true
}

const getters = {}
const mutations = {
  LOADING (state, value) {
    state.loading = value
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
