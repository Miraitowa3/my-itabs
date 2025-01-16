import  './assets/css/base.css'
import  './assets/css/reset.css'
import  './web-components/index'
import { createApp } from 'vue'
import 'virtual:svg-icons-register';
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
