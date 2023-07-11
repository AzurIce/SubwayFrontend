import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

import VueApexCharts from 'vue3-apexcharts'

// import { aliases, mdi } from 'vuetify/iconsets/mdi'

createApp(App)
  .use(createPinia())
  .use(router)
  .use(createVuetify())
  .use(VueApexCharts)
  // .use(Particles)
  .mount('#app')
