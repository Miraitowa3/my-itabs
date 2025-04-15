import 'animate.css';
import  './assets/css/index.css'
import  './web-components/index'
import 'virtual:svg-icons-register';
import * as ElementPlus from 'element-plus'
import { createApp } from 'vue'
import * as Vue from 'vue'
import DialogHeader from '@/components/DialogHeader.vue'
import SvgIcon from '@/components/SvgIcon.vue'


import App from './App.vue'
import router from './router'
import pinia from './stores';
import { useBaseConfigStore } from "./stores/baseConfig"
import { useGlobalStore} from "./stores/global"

// window.define('vue',function () {
//     return Vue;
// })
// window.define('element-plus',function () {
//     return ElementPlus;
// })
// window.sharedPinia = pinia
const app = createApp(App)
app.component('DialogHeader',DialogHeader)
app.component('SvgIcon',SvgIcon)

app.use(pinia);
app.use(router)
app.mount('#app')
//强制持久化存储
useBaseConfigStore().$persist()
useGlobalStore().$persist()
