import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
const vuetify = createVuetify()

import Vue3BaiduMapGL from 'vue3-baidu-map-gl'

createApp(App)
    .use(createPinia())
    .use(router)
    .use(vuetify)
    .use(Vue3BaiduMapGL, {
        ak: 'KG6YhqSuGhx192cRVdgHzvHHG7TI0dua'
    })

    .mount('#app')
