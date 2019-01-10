import '@babel/polyfill'
import 'es6-promise/auto'
import 'event-source-polyfill'

import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'

import VueScrollTo from 'vue-scrollto'
import VueSweetalert2 from 'vue-sweetalert2'

import routes from './router'
import store from './store'
import { init } from './assets'

import Transitions from 'vue2-transitions'
import VueSimplemde from 'vue-simplemde'
import { VueSlideoutPanel } from 'vue2-slideout-panel'
import Moment from 'vue-moment'
import ToggleButton from 'vue-js-toggle-button'
import VueTextareaAutosize from 'vue-textarea-autosize'

import FeedSlide from './components/FeedSlide.vue'
import TempSlide from './components/TempSlide.vue'
import TopicWriteSlide from './components/TopicWriteSlide.vue'
import FeedWriteSlide from './components/FeedWriteSlide.vue'
import ReferSlide from './components/ReferSlide.vue'

import './assets/css/materialdesignicons.min.css'
import './assets/css/nucleo-icons.css'
import './assets/css/util.css'

import './assets/css/layers.min.css'
import './assets/css/beetle.css'

import 'simplemde/dist/simplemde.min.css'
import 'vue-simple-suggest/dist/styles.css'

Vue.component('slideout-panel', VueSlideoutPanel)
Vue.component('temp-slide', TempSlide)
Vue.component('feed-slide', FeedSlide)
Vue.component('topic-write-slide', TopicWriteSlide)
Vue.component('feed-write-slide', FeedWriteSlide)
Vue.component('refer-slide', ReferSlide)

Vue.use(VueRouter)
Vue.use(VueScrollTo)
Vue.use(VueSweetalert2)
Vue.use(Moment)
Vue.use(VueSimplemde)
Vue.use(ToggleButton)
Vue.use(Transitions)
Vue.use(VueTextareaAutosize)

Vue.config.productionTip = false
let firstLoading = true

const router = new VueRouter({
  mode: 'history',
  routes,
  linkActiveClass: 'nav-item active',
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash }
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  if (from.path.indexOf('devlog') >= 0) VueScrollTo.scrollTo('#app', 500)
  next()
})

router.afterEach((to, from) => {
  if (from.path !== '/') localStorage.setItem('from', from.path)
  let time = 500
  if (firstLoading) {
    time = 1500
    firstLoading = false
  }

  setTimeout(() => {
    store.commit('main/LOADING', false)
    init()
  }, time)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
