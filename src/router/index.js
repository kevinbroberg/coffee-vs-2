import Vue from 'vue'
import VueRouter from 'vue-router'
import CardHome from '../views/CardHome.vue'
import DeckDataGrid from '../views/DeckDataGrid.vue'
import DeckLoader from '../views/DeckLoader.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: CardHome,
    props: (route) => ({ query: route.query })
  },
  {
    path: '/deck',
    name: 'Deck',
    component: DeckDataGrid
  },
  {
    path: '/input',
    name: 'Deck Loader',
    component: DeckLoader
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
