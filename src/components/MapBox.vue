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

import { getHeatMapGeoJson } from '@/lib/axios/data'

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
  console.log('loading...')
  loading.value = true
  try {
    await mapStore.updateData()
    await updateRoutes()
    await updateTrainPositions()
    await updateHeatMap()
  } catch (error) {
    // console.log(error)
    msg.value = 'error'
  }
  loading.value = false
}

async function updateHeatMap() {
  const res = await getHeatMapGeoJson()
  console.log(res)
  if (map.getSource("stationMes")) {
    map.getSource("stationMes").setData(res);
  } else {
    map.addSource("stationMes", {
      "type": "geojson",
      "data": res
    });
  }

  if (!map.getLayer("StationEntry-heat")) {

    map.addLayer(
      {
        'id': 'StationEntry-heat',
        'type': 'heatmap',
        'source': 'stationMes',    //读取资源
        'maxzoom': 11,               //设置最大缩放级别,超过这个点位后用圆圈来标识
        'paint': {
          // Increase the heatmap weight based on frequency and property magnitude
          'heatmap-weight': [
            'interpolate',
            ['linear'],
            ['get', 'Entries'],
            0,
            0,
            2000,
            1
          ],
          // Increase the heatmap color weight weight by zoom level
          'heatmap-intensity': [ //给强度设置热力图
            'interpolate',
            ['linear'],
            ['zoom'],
            0,
            1,
            13,
            3
          ],
          // to create a blur-like effect.
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'], //热力图密度函数
            0,
            'rgba(33,102,172,0)',
            0.2,
            'rgb(103,169,207)',
            0.4,
            'rgb(209,229,240)',
            0.6,
            'rgb(253,219,199)',
            0.8,
            'rgb(239,138,98)',
            1,
            'rgb(178,24,43)'
          ],
          // Adjust the heatmap radius by zoom level
          'heatmap-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0,
            2,
            13,
            20
          ],
          // Transition from heatmap to circle layer by zoom level
          'heatmap-opacity': [ //到9的时候热力图透明度为0
            'interpolate',
            ['linear'],
            ['zoom'],
            10,
            1,
            13,
            0
          ]
        }
      },
      'waterway-label'
    );
  }

  if (!map.getLayer("StationEntry-point")) {
    map.addLayer(
      {
        'id': 'StationEntry-point',
        'type': 'circle',
        'source': 'stationMes',
        'minzoom': 11,
        'paint': {

          'circle-radius': [ //动态调整了半径大小
            'interpolate',
            ['linear'],
            ['zoom'],
            11,
            ['interpolate', ['linear'], ['to-number', ['get', 'Entries']], 1, 3, 2000, 10],
            18,
            ['interpolate', ['linear'], ['to-number', ['get', 'Entries']], 1, 20, 2000, 50]
          ],

          'circle-color': [
            'interpolate',
            ['linear'],
            ['to-number', ['get', 'Entries']],
            40,
            'rgba(33,102,172,0.2)',
            300,
            'rgb(103,169,207)',
            600,
            'rgb(209,229,240)',
            1000,
            'rgb(253,219,199)',
            1500,
            'rgb(239,138,98)',
            2000,
            'rgb(178,24,43)'
          ],

          'circle-stroke-color': 'white', //描边颜色
          'circle-stroke-width': 1,       //描边宽度
          // Transition from heatmap to circle layer by zoom level 设置透明度
          'circle-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            11,
            0,
            11.5,
            1
          ]
        }
      },
      'waterway-label'
    );
  }

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
        <v-switch label="实时更新" v-model="autoUpdate" @update:modelValue="switchRealtime" class="tw-inline-block tw-ml-4" hide-details></v-switch>
        <v-switch label="热力图" class="tw-inline-block tw-ml-4" hide-details></v-switch>
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