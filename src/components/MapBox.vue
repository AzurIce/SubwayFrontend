<script setup>
import mapboxgl from 'mapbox-gl' // or "const mapboxgl = require('mapbox-gl');"
import 'mapbox-gl/dist/mapbox-gl.css'
import { onMounted } from 'vue'

import { useMapStore } from '../stores/goodservice'

const mapStore = useMapStore()

mapboxgl.accessToken =
  'pk.eyJ1IjoiYXp1cmljZSIsImEiOiJjbGpwMnQxcXIxYTNpM2VvNmo0OG14cm1xIn0.dc0RFy9AhS-sxmtnvdI4Qw'
let map = null

async function updateRoutes() {
  const routesGeoJson = await mapStore.getRoutesGeoJson()
  console.log(routesGeoJson)

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

onMounted(async () => {
  map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/dark-v10', // style URL
    // center: [-73.904496, 40.720449], // starting position [lng, lat]
    maxBounds: [
      [-74.309883, 40.48388],
      [-73.677476, 40.909622]
    ],
    zoom: 9 // starting zoom
  })


  map.on('load', async () => {
    console.log('load')
    map.addSource('stop', {
      type: 'geojson',
      data: 'stations.geojson'
    })
    map.addLayer({
      id: 'stop',
      type: 'circle',
      source: 'stop',
      paint: {
        // 'circle-pitch-scale': 'map',
        'circle-color': '#dddddd',
        'circle-opacity': 0.3,
        'circle-radius': 4
      }
    })
    updateRoutes()
  })
})
</script>

<template>
  <div class="tw-flex tw-flex-col tw-h-full">
    <v-btn>???</v-btn>
    <div id="map" class="tw-h-full tw-w-full tw-flex-1" />
  </div>
</template>

<style scoped>
.marker {
  color: white;
}
</style>