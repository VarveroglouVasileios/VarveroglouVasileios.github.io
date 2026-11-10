import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('./views/HomeView.vue') },
    { path: '/menu', name: 'menu', component: () => import('./views/MenuView.vue') },
    { path: '/book', name: 'book', component: () => import('./views/BookView.vue') },
    { path: '/confirmation/:ref', name: 'confirmation', component: () => import('./views/ConfirmationView.vue') },
    { path: '/admin', name: 'admin', component: () => import('./views/AdminView.vue') },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior: () => ({ top: 0 }),
})
