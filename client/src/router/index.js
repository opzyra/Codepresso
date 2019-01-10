import Navbar from '../layout/Navbar.vue'
import Footer from '../layout/Footer.vue'
import Scroll from '../layout/Scroll.vue'

import Login from '../views/Login.vue'
import NotFound from '../views/NotFound.vue'
import NonAuthenticated from '../views/NonAuthenticated.vue'
import Home from '../views/Home.vue'
import Portfolio from '../views/Portfolio.vue'
import DevLog from '../views/DevLog.vue'
import Topic from '../views/Topic.vue'
import TopicEditor from '../views/TopicEditor.vue'
import Feed from '../views/Feed.vue'
import FeedEditor from '../views/FeedEditor.vue'

import store from '../store'

const isAuth = () => (to, from, next) => {
  const role = store.getters['auth/role']
  const home = `/home`
  role === null ? next() : next(home)
}

const requireAdmin = () => (to, from, next) => {
  const role = store.getters['auth/role']
  const nonAuth = `/nonauth`
  role === 'ROLE_ADMIN' ? next() : next(nonAuth)
}

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    components: {
      nav: Navbar,
      contents: Home,
      footer: Footer,
      scroll: Scroll
    }
  },
  {
    path: '/portfolio',
    components: {
      nav: Navbar,
      contents: Portfolio,
      footer: Footer,
      scroll: Scroll
    }
  },
  {
    path: '/devlog',
    components: {
      nav: Navbar,
      contents: DevLog,
      footer: Footer,
      scroll: Scroll
    }
  },
  {
    path: '/devlog/topic/editor',
    beforeEnter: requireAdmin(),
    components: {
      contents: TopicEditor,
      scroll: Scroll
    }
  },
  {
    path: '/devlog/topic/editor/:idx',
    beforeEnter: requireAdmin(),
    components: {
      contents: TopicEditor,
      scroll: Scroll
    }
  },
  {
    path: '/devlog/topic/:idx',
    components: {
      nav: Navbar,
      contents: Topic,
      footer: Footer,
      scroll: Scroll
    }
  },
  {
    path: '/devlog/feed/editor',
    beforeEnter: requireAdmin(),
    components: {
      contents: FeedEditor,
      scroll: Scroll
    }
  },
  {
    path: '/devlog/feed/editor/:idx',
    beforeEnter: requireAdmin(),
    components: {
      contents: FeedEditor,
      scroll: Scroll
    }
  },
  {
    path: '/devlog/feed/:idx',
    components: {
      nav: Navbar,
      contents: Feed,
      footer: Footer,
      scroll: Scroll
    }
  },
  {
    path: '/login',
    beforeEnter: isAuth(),
    components: {
      contents: Login
    }
  },
  {
    path: '/nonauth',
    components: {
      contents: NonAuthenticated
    }
  },
  {
    path: '*',
    components: {
      contents: NotFound
    }
  }
]

export default routes
