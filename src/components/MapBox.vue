<script setup>
// MapBox GLJS API
import mapboxgl from 'mapbox-gl' // or "const mapboxgl = require('mapbox-gl');"
import 'mapbox-gl/dist/mapbox-gl.css'

import { onMounted, ref } from 'vue'

import { useMapStore } from '../stores/goodservice'
const mapStore = useMapStore()

mapboxgl.accessToken =
  'pk.eyJ1IjoiYXp1cmljZSIsImEiOiJjbGp3NmM5OHkwOWdxM2Vwa2Jjb2tjdzZnIn0.-Ohkio-ahwFWJT3BcckSuA'
let map = null

async function updateRoutes() {
  const routesGeoJson = await mapStore.getRoutesGeoJson()
  // console.log(routesGeoJson)

  for (let route_key in routesGeoJson) {
    const geojson = routesGeoJson[route_key]

    const layerId = `route-${route_key}`;
    if (map.getSource(layerId)) {
      map.getSource(layerId).setData(geojson);
    } else {
      map.addSource(layerId, {
        "type": "geojson",
        "data": geojson
      });
    }

    if (!map.getLayer(layerId)) {
      const layer = {
        "id": layerId,
        "type": "line",
        "source": layerId,
        "layout": {
          "line-join": "miter",
          "line-cap": "round",
        },
        "paint": {
          "line-width": [
            "interpolate",
            ["linear"],
            ["zoom"],
            8, 1,
            13, 2,
            14, 5,
          ],
          "line-color": ["get", "color"],
          "line-offset": [
            "interpolate",
            ["linear"],
            ["zoom"],
            8, ["get", "offset"],
            13, ["*", ["get", "offset"], 1.5],
            14, ["*", ["get", "offset"], 3],
          ],
          "line-opacity": ["get", "opacity"],
        }
      };

      map.addLayer(layer);
    }
  }
}

async function updateTrainPositions() {
  const trainPositionsGeoJson = await mapStore.getTrainPositionsGeoJson()
  // console.log(trainPositionsGeoJson)
  if (map.getSource("TrainPositions")) {
    map.getSource("TrainPositions").setData(trainPositionsGeoJson);
  } else {
    map.addSource("TrainPositions", {
      "type": "geojson",
      "data": trainPositionsGeoJson
    });
  }

  if (!map.getLayer("TrainPositions")) {
    // let blink = false;
    map.addLayer({
      "id": "TrainPositions",
      "type": "symbol",
      "source": "TrainPositions",
      "layout": {
        // "icon-image": ['get', 'icon'],
        "icon-image": ['get', 'icon'],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,
        "icon-size": {
          "stops": [[10, 0.5], [11, 1], [12, 1.5], [13, 2]]
        },
        "icon-rotate": ['get', 'bearing'],
        "icon-rotation-alignment": "map",
        "text-field": ['get', 'route'],
        "text-font": ['Lato Bold', "Open Sans Bold", "Arial Unicode MS Bold"],
        "text-size": {
          "stops": [[10, 6], [11, 8], [12, 10], [13, 12]]
        },
        "text-ignore-placement": true,
        "text-allow-overlap": true,
        // "text-offset": ['get', 'offset'],
        "text-rotate": ['get', 'text-rotate']
      },
      "paint": {
        "text-color": ['get', 'text-color'],
        "icon-color": ['get', 'icon-color'],
        "text-color-transition": {
          "duration": 500,
        },
        "text-halo-color": "#666666",
        "text-halo-width": ['get', 'halo-width'],
      },
      // "filter": ['get', 'visibility']
    });


    // setInterval(() => {
    //   map.setPaintProperty('TrainPositions', "text-color", blink ? ['get', 'alternate-text-color'] : ['get', 'text-color']);
    //   blink = !blink;
    // }, 1000);
  }
  map.moveLayer('TrainPositions', null)
}


const loading = ref(false)
async function allUpdate() {
  loading.value = true
  await mapStore.updateData()
  await updateRoutes()
  await updateTrainPositions()
  loading.value = false
}

async function updateData() {
  loading.value = true
  await mapStore.updateData()
  await updateRoutes()
  loading.value = false
}


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

</script>

<template>
  <v-overlay :model-value="overlay" class="align-center justify-center" :persistent="true">
    <div class="tw-flex tw-flex-col">
      <v-progress-circular color="white" indeterminate size="64">🫠</v-progress-circular>
      <span class="tw-text-white">loading...</span>
    </div>
  </v-overlay>
  <div class="tw-h-full tw-relative">
    <div class="tw-flex tw-flex-col tw-bg-white tw-rounded tw-absolute tw-z-10 tw-m-4 tw-p-4 tw-shadow">
      <div clas="tw-flex">
        <v-btn icon="mdi-refresh" @click="allUpdate" :loading="loading" inline />
        <v-switch label="实时更新" v-model="autoUpdate" @update:modelValue="switchRealtime"></v-switch>
      </div>
      <!-- {{ selectedId }} -->
      <!-- 我们在加载的时候显示旋转动画 -->
      <StationInfo v-model="selectedId" />
    </div>
    <div id="map" class="tw-h-full tw-w-full" />
  </div>
</template>

<style scoped>
.marker {
  color: white;
}
</style>