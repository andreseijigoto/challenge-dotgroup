import { createRouter, createWebHistory } from 'vue-router'
import { HomeView, MainLayout, CheckoutView } from '@/views'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MainLayout',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'Home',
          component: HomeView
        },
        {
          path: 'checkout',
          name: 'Checkout',
          component: CheckoutView
        }
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})
