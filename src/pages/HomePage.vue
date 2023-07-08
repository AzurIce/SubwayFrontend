<script setup>
import router from '../router/index'
import { onMounted } from 'vue'

let map = null

import { getData } from '../lib/gtfs/gtfs'
// import axios from 'axios';
// import stops_data from './stops.json'
import stops_data from '../assets/stops.json'

// console.log(stops_data)
import { useTokenStore } from '../stores/token'
const tokenStore = useTokenStore()


onMounted(() => {

})
// -73.913192,40.903221
// -73.764864,40.533469


function onLogout() {
  tokenStore.unSetToken()
  router.push('/login')
}

// async function onGetData() {
//   const geojson = getData()
// }
import MapBox from '../components/MapBox.vue'
</script>

<template>
  <v-layout class="tw-h-full">
    <v-app-bar :elevation="2" title="地铁客流量预测系统">
      <v-btn icon="mdi-poll"></v-btn>
      <v-btn icon="mdi-exit-run" @click="onLogout()"></v-btn>
    </v-app-bar>
    <v-main class="tw-h-full">
      <MapBox />
    </v-main>
  </v-layout>
</template>

<style scoped></style>