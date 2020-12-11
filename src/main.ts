import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.scss'
import router from '@/router'
import config from '@/config'

// @ts-ignore
createApp(App as any)
    .use(router)
    .mount('#app')

console.log(config)
