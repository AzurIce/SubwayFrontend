<script setup>
import GtfsRealtimeBindings from "gtfs-realtime-bindings";
import 'mapbox-gl/dist/mapbox-gl.css';
// import subway_lines_data from '../assets/Subway Lines.geojson'
import { onMounted } from 'vue'

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken = 'pk.eyJ1IjoiYXp1cmljZSIsImEiOiJjbGpwMnQxcXIxYTNpM2VvNmo0OG14cm1xIn0.dc0RFy9AhS-sxmtnvdI4Qw';

let map = null

import axios from 'axios'

onMounted(() => {
  map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/dark-v10', // style URL
    // center: [-73.904496, 40.720449], // starting position [lng, lat]
    maxBounds: [
      [-74.309883, 40.48388],
      [-73.677476, 40.909622]
    ],
    zoom: 9, // starting zoom
  });

  map.on('load', () => {
    map.addSource('route', {
      'type': 'geojson',
      'data': 'shapes.geojson'
    })
    map.addSource('stop', {
      'type': 'geojson',
      'data': 'stops.geojson'
    })
    map.addLayer({
      'id': 'route',
      'type': 'line',
      'source': 'route',
      'layout': {
        'line-join': 'round',
        'line-cap': 'round',
      },
      'paint': {
        'line-color': ["get", 'color'],
        'line-width': 2,
        // 'line-opacity': 0.6,
      }
    })
    map.addLayer({
      'id': 'stop',
      'type': 'circle',
      'source': 'stop',
      'paint': {
        // 'circle-pitch-scale': 'map',
        'circle-color': '#dddddd',
        'circle-opacity': 0.3,
        'circle-radius': 4
      }
    })
  })

})
// -73.913192,40.903221
// -73.764864,40.533469

function onGetData() {
  axios.get(
    'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace',
    {
      headers: { "x-api-key": 'wfaW5qsRVD3CjWqaCecgz5w3PswW11Dxa3iv3PAl' },
      responseType: 'arraybuffer'
    }
  ).then((res) => {
    // 处理成功情况
    console.log(res.data);
    console.log(new Uint8Array(res.data))
    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
      new Uint8Array(res.data)
    );
    feed.entity.forEach((entity) => {
      if (entity.tripUpdate) {
        console.log(entity.tripUpdate);
      }
      // if (entity.vehicle && entity.vehicle.position) {
      //   console.log(entity.vehicle.position);
      // }
    });
  }).catch((error) => {
    // 处理错误情况
    console.log(error);
  }).then(() => {
    // 总是会执行
  });
}
</script>

<template>
  <!-- <button @click="onGetData">getData</button> -->
  <!-- <button @click="() => {map.setCenter([0, 0])}">asddasdasd</button> -->
  <div id="map" class="tw-h-full tw-w-full" />
  <!-- <BMap
    :height="'100%'"
    :width="'100%'"
    :center="center">
    <BZoom />
  </BMap> -->
</template>

<style scoped></style>