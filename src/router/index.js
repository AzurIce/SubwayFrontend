import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../pages/LoginPage.vue'
import HomePage from '../pages/HomePage.vue'
import AboutPage from '../pages/AboutPage.vue'
import TestPage from '../pages/TestPage.vue'
import CountPage from '../pages/CountPage.vue'
import AdminPage from '../pages/AdminPage.vue'
import MainPage from '../pages/MainPage.vue'

import { useTokenStore } from '../stores/token'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      meta: {
        requireAuth: true
      },
      component: MainPage,
      children: [
        {
          path: '',
          name: 'home',
          meta: {
            requireAuth: true
          },
          component: HomePage,
        },
        {
          path: '/admin',
          name: 'admin',
          component: AdminPage,
          meta: {
            requireAuth: true
          },
        },
        {
          path: '/count',
          name: 'count',
          component: CountPage,
          meta: {
            requireAuth: true
          },
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage
    },
    {
      path: '/heat',
      name: 'heat',
      meta: {
        requireAuth: true
      },
      component: () => import('../components/HeatMap.vue')
    },
    {
      path: '/test',
      name: 'test',
      meta: {
        requireAuth: true
      },
      component: TestPage
    },
    {
      path: '/star',
      name: 'star',
      component: () => import('../components/Star.vue')
    }
  ]
})

router.beforeEach((to, from) => {
  const tokenStore = useTokenStore()
  if (to.meta.requireAuth && !tokenStore.isLoggedIn && !import.meta.env.DEV) {
    router.replace('/login')
    // 返回 false 以取消导航
    return false
  }
  return true
})

export default router
