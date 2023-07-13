import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

import VueApexCharts from 'vue3-apexcharts'

createApp(App)
  .use(createPinia())
  .use(router)
  .use(createVuetify())
  .use(VueApexCharts)
  .mount('#app')
