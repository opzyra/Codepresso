import store from '../store'

const Navbar = () => import('../layout/Navbar.vue')
const Footer = () => import('../layout/Footer.vue')
const Scroll = () => import('../layout/Scroll.vue')

const Login = () => import('../views/Login.vue')
const NotFound = () => import('../views/NotFound.vue')
const NonAuthenticated = () => import('../views/NonAuthenticated.vue')
const Home = () => import('../views/Home.vue')
const Portfolio = () => import('../views/Portfolio.vue')
const DevLog = () => import('../views/DevLog.vue')
const Topic = () => import('../views/Topic.vue')
const TopicEditor = () => import('../views/TopicEditor.vue')
const Feed = () => import('../views/Feed.vue')
const FeedEditor = () => import('../views/FeedEditor.vue')

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
