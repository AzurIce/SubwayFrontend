<script setup>
  import 'mapbox-gl/dist/mapbox-gl.css';
  import { BMap, BZoom } from 'vue3-baidu-map-gl'
  import { onMounted, reactive } from 'vue'

  import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

  mapboxgl.accessToken = 'pk.eyJ1IjoiYXp1cmljZSIsImEiOiJjbGpwMnQxcXIxYTNpM2VvNmo0OG14cm1xIn0.dc0RFy9AhS-sxmtnvdI4Qw';

  onMounted(() => {
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: [-74.5, 40], // starting position [lng, lat]
        zoom: 9, // starting zoom
    });
  })


  const center = reactive({
    lng: -73.904496,
    lat: 40.720449
  })
</script>

<template>
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