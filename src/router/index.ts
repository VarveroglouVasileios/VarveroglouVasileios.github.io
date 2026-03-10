import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('@/views/ProjectsView.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/views/ContactView.vue'),
    },
  ],
  async scrollBehavior(to) {
    const navOffset = window.innerWidth < 640 ? 156 : 112

    if (to.hash) {
      await new Promise((resolve) => {
        window.setTimeout(resolve, 60)
      })

      return {
        el: to.hash,
        top: navOffset,
        behavior: 'smooth',
      }
    }

    return { top: 0, left: 0 }
  },
})

export default router
