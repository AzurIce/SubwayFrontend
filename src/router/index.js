import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import LoginPage from '../pages/LoginPage.vue'
import HomePage from '../pages/HomePage.vue'

import {useTokenStore} from '../stores/token'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        requireAuth: true,
      },
      component: HomePage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

router.beforeEach((to, from) => {
  const tokenStore = useTokenStore()
  if (to.meta.requireAuth && !tokenStore.isLoggedIn && !import.meta.env.DEV) {
    router.replace('/login')
    return false
  }
  // ...
  // 返回 false 以取消导航
  return true
})

export default router
