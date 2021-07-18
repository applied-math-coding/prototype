import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/items',
    name: 'Items',
    component: () => import('../views/Items.vue'),
    children: [
      {
        path: '',
        name: 'itemList',
        component: () => import('../components/ItemList.vue')
      },
      {
        path: 'edit/:id',
        name: 'itemEditor',
        props: true,
        component: () => import('../components/ItemEditor.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
