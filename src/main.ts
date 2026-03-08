import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'

const app = createApp(App)

// Register Pinia for global state management
app.use(createPinia())

app.mount('#app')
