import { createApp } from 'vue'
import Tres from '@tresjs/core'
import App from './App.vue'
import router from './router'
import './style.css'

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

const app = createApp(App)
app.use(Tres)
app.use(router)
app.mount('#app')

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
