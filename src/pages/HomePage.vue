<script setup>
import router from '../router/index'
import { ref } from 'vue'

// let map = null

// import { getData } from '../lib/gtfs/gtfs'
// import axios from 'axios';
// import stops_data from './stops.json'
// import stops_data from '../assets/stops.json'
// console.log(stops_data)


// onMounted(() => {
//   setTimeout(() => (dialog.value = false), 2500)
// })
// -73.913192,40.903221
// -73.764864,40.533469


// async function onGetData() {
//   const geojson = getData()
// }
import MapBox from '../components/MapBox.vue'
import NavigationBar from '../components/NavigationBar.vue';
</script>

<template>
  <v-layout class="tw-h-full">
    <NavigationBar></NavigationBar>
    <v-main class="tw-h-full">
      <MapBox />
    </v-main>
  </v-layout>
</template>

<style scoped></style>