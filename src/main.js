import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
const vuetify = createVuetify()

createApp(App)
    .use(createPinia())
    .use(router)
    .use(vuetify)

    .mount('#app')
