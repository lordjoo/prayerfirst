import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: "/adaan",
    name: "adaan-alert",
    component: () => import('../views/Adaan')
  },

  {
    path: '/setup',
    name: 'Setup',
    component: () => import('../views/setup')
  },
  {
    path: '/setup/2',
    name: 'setup-2',
    component: () => import('../views/setup/setup-2')
  },
  {
    path: '/setup/3',
    name: 'setup-3',
    component: () => import('../views/setup/setup-3')
  },


]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
