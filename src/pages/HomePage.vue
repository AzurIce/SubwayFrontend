<script setup>
  import 'mapbox-gl/dist/mapbox-gl.css';
  // import subway_lines_data from '../assets/Subway Lines.geojson'
  import { onMounted } from 'vue'

  import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

  mapboxgl.accessToken = 'pk.eyJ1IjoiYXp1cmljZSIsImEiOiJjbGpwMnQxcXIxYTNpM2VvNmo0OG14cm1xIn0.dc0RFy9AhS-sxmtnvdI4Qw';

  let map = null

  onMounted(() => {
    map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        // center: [-73.904496, 40.720449], // starting position [lng, lat]
        maxBounds: [
          [-74.309883, 40.48388],
          [-73.677476, 40.899622]
        ],
        zoom: 9, // starting zoom
    });

    map.on('load', () => {
      map.addSource('route', {
        'type': 'geojson',
        'data': 'Subway Lines.geojson'
      })
      map.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
        'line-join': 'round',
        'line-cap': 'round'
        },
        'paint': {
        'line-color': '#888',
        'line-width': 8
        }
      })
    })
  })
  // -73.913192,40.903221
  // -73.764864,40.533469

</script>

<template>
  <!-- <button @click="() => {map.setCenter([0, 0])}">asddasdasd</button> -->
  <div id="map" class="tw-h-full tw-w-full"/>
  <!-- <BMap
    :height="'100%'"
    :width="'100%'"
    :center="center">
    <BZoom />
  </BMap> -->
</template>

<style scoped>
</style>