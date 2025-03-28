import 'animate.css';
import  './assets/css/index.css'
import  './web-components/index'

import { createApp } from 'vue'
import 'virtual:svg-icons-register';
import App from './App.vue'
import router from './router'
import pinia from './stores';
const app = createApp(App)
app.use(pinia);
app.use(router)
app.mount('#app')
