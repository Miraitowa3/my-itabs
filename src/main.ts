import 'animate.css';
import  './assets/css/index.css'
import  './web-components/index'

import { createApp } from 'vue'
import 'virtual:svg-icons-register';
import App from './App.vue'
import router from './router'
import pinia from './stores';
import { useBaseConfigStore } from "./stores/baseConfig"
import { useGlobalStore} from "./stores/global"



useGlobalStore
const app = createApp(App)
app.use(pinia);
app.use(router)
app.mount('#app')
//强制持久化存储
useBaseConfigStore().$persist()
useGlobalStore().$persist()
