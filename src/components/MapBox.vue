<script setup>
// MapBox GLJS API
import mapboxgl from 'mapbox-gl' // or "const mapboxgl = require('mapbox-gl');"
import 'mapbox-gl/dist/mapbox-gl.css'

import { onMounted, ref, watch } from 'vue'

import { useMapStore } from '../stores/goodservice'
const mapStore = useMapStore()

mapboxgl.accessToken =
  'pk.eyJ1IjoiYXp1cmljZSIsImEiOiJjbGp3NmM5OHkwOWdxM2Vwa2Jjb2tjdzZnIn0.-Ohkio-ahwFWJT3BcckSuA'
let map = null

import { getHeatMapGeoJson } from '@/lib/axios/data'

const enableHeatMap = ref(false)
const enableRoute = ref(true)
const enablePos = ref(true)
let routeIds = []

import { heatmapEntriesHeatId, heatmapEntriesPointId, heatmapEntriesLabelId, updateHeatMap, setHeatmapVisible } from '@/lib/mapbox/heatmap'
import { positionId, updatePosition, setPositionVisible } from '@/lib/mapbox/position'
import { routeId, updateRoute, setRouteVisible } from '@/lib/mapbox/route'

watch(enableHeatMap, (newVal) => { setHeatmapVisible(map, newVal) })
watch(enableRoute, (newVal) => { setRouteVisible(map, newVal) })
watch(enablePos, (newVal) => { setPositionVisible(map, newVal) })

async function updateRoutes() {
  const geojson = await mapStore.getRoutesGeoJson()
  await updateRoute(map, geojson)
}

async function updateTrainPositions() {
  const trainPositionsGeoJson = await mapStore.getTrainPositionsGeoJson()
  await updatePosition(map, trainPositionsGeoJson)
}

const loading = ref(false)
async function allUpdate() {
  console.log('loading...')
  loading.value = true
  try {
    await mapStore.updateData()
  } catch (error) {
    msg.value = `updateData Failed: ${error}`
  }
  try {
    await updateRoutes()
  } catch (error) {
    msg.value = `updateRoutes Failed: ${error}`
  }
  try {
    await updateTrainPositions()
  } catch (error) {
    msg.value = `updateTrainPositions Failed: ${error}`
  }
  try {
    await updateHeatMap(map)
  } catch (error) {
    msg.value = `updateHeatMap Failed: ${error}`
  }
  map.moveLayer(heatmapEntriesHeatId, positionId)
  map.moveLayer(heatmapEntriesPointId, positionId)
  map.moveLayer(heatmapEntriesLabelId, positionId)
  map.moveLayer(positionId, null)
  loading.value = false
}

async function updateData() {
  loading.value = true
  await mapStore.updateData()
  await updateRoutes()
  loading.value = false
}

const geoControl = new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true
  },
  trackUserLocation: true
});

const selectedId = ref('')
const overlay = ref(true)
function initMap() {
  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    maxBounds: [
      [-74.309883, 40.48388],
      [-73.677476, 40.909622]
    ],
    zoom: 9 // starting zoom
  })

  map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "bottom-right");
  map.addControl(geoControl, 'bottom-right');


  map.on('load', async () => {
    map.loadImage('train.png', (error, image) => {
      if (error) throw error;
      map.addImage('train', image, { 'sdf': true });
    })

    // Stop
    map.addSource('stop', {
      type: 'geojson',
      data: 'stations.geojson'
    })
    map.addLayer({
      id: 'stop',
      type: 'circle',
      source: 'stop',
      paint: {
        'circle-color': '#dddddd',
        'circle-opacity': 0.7,
        'circle-radius': 4
      }
    })

    // Choosing stop
    map.on('click', 'stop', (e) => {
      console.log(`clicked ${e.features[0].properties.id}`)
      selectedId.value = e.features[0].properties.id
    });

    // Cursor changing
    map.on('mouseenter', 'stop', () => {
      map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'stop', () => {
      map.getCanvas().style.cursor = '';
    });
    await allUpdate()
    setHeatmapVisible(map, enableHeatMap.value)
    overlay.value = false
  })
}

onMounted(initMap)

import StationInfo from '../components/StationInfo.vue'

const autoUpdate = ref(false)
let dataInterval = 0
let trainPosInterval = 0
function switchRealtime(res) {
  if (res) {
    dataInterval = setInterval(updateData, 2500)
    trainPosInterval = setInterval(updateTrainPositions, 50)
  } else {
    clearInterval(dataInterval)
    clearInterval(trainPosInterval)
  }
}

import SnackBar from '@/components/SnackBar.vue'
const msg = ref('')
</script>

<template>
  <SnackBar v-model="msg" />
  <v-overlay :model-value="overlay" class="align-center justify-center" :persistent="true">
    <div class="tw-flex tw-flex-col">
      <v-progress-circular color="white" indeterminate size="64">🫠</v-progress-circular>
      <span class="tw-text-white">loading...</span>
    </div>
  </v-overlay>
  <div class="tw-h-full tw-relative">
    <div class="tw-flex tw-flex-col tw-bg-white
     tw-rounded tw-absolute tw-z-10 tw-m-4 tw-p-4 tw-shadow tw-mb-4 tw-w-1/3 tw-max-w-lg tw-max-h-90">

      <div class="tw-flex tw-items-center">
        <v-btn icon="mdi-refresh" @click="allUpdate" :loading="loading" inline />
        <v-switch label="实时更新" v-model="autoUpdate" @update:modelValue="switchRealtime" class="tw-inline-block tw-ml-4"
          hide-details></v-switch>
      </div>
      <div class="tw-flex tw-items-center">
        <v-switch label="列车位置" v-model="enablePos" class="tw-inline-block tw-ml-4" hide-details></v-switch>
        <v-switch label="线路" v-model="enableRoute" class="tw-inline-block tw-ml-4" hide-details></v-switch>
        <v-switch label="热力图" class="tw-inline-block tw-ml-4" hide-details v-model="enableHeatMap"></v-switch>
      </div>

      <hr class="tw-mt-4 tw-mb-4" v-if="selectedId" />

      <StationInfo v-model="selectedId" v-if="selectedId" />
    </div>
    <div id="map" class="tw-h-full tw-w-full" />
  </div>
</template>

<style scoped>
.marker {
  color: white;
}
</style>