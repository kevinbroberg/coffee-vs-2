import Vue from 'vue'
import VueRouter from 'vue-router'
import CardHome from '../views/CardHome.vue'

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
    // route level code-splitting
    // this generates a separate chunk (deck.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/DeckDataGrid.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/ultra',
    name: 'Ultra Search',
    // route level code-splitting
    // this generates a separate chunk (ultra.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Ultra.vue')
  },
  {
    path: '/loader',
    name: 'Deck Input',
    // route level code-splitting
    // this generates a separate chunk (loader.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/DeckLoader.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
