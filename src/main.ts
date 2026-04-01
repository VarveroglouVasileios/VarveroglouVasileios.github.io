import { createApp } from 'vue'
import Tres from '@tresjs/core'
import App from './App.vue'
import router from './router'
import { i18n } from './i18n'
import './style.css'

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

const app = createApp(App)

if (import.meta.env.PROD) {
  app.config.warnHandler = (): void => {}
}

app.use(Tres)
app.use(i18n)
app.use(router)
app.mount('#app')

// GitHub Pages SPA: restore route from 404 redirect
const redirect = sessionStorage.redirect
if (redirect) {
  delete sessionStorage.redirect
  const path = redirect.replace(window.location.origin, '')
  if (path !== window.location.pathname) {
    window.history.replaceState(null, '', redirect)
    router.replace(path)
  }
}

function scrollToTop(): void {
  if (!window.location.hash) {
    window.scrollTo(0, 0)
  }
}

router.isReady().then(() => {
  scrollToTop()
  requestAnimationFrame(scrollToTop)
  setTimeout(scrollToTop, 0)
  setTimeout(scrollToTop, 100)
})
