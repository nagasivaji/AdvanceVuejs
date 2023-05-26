import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FormPage1 from '../views/FormPage1.vue'
import FormPage2 from '../views/FormPage2.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },{
    path: '/form1',
    name: 'form1',
    component: FormPage1
  },{
    path: '/form2',
    name: 'form2',
    component: FormPage2
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
