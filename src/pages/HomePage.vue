<script setup>
import 'mapbox-gl/dist/mapbox-gl.css';
import { onMounted } from 'vue'

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken = 'pk.eyJ1IjoiYXp1cmljZSIsImEiOiJjbGpwMnQxcXIxYTNpM2VvNmo0OG14cm1xIn0.dc0RFy9AhS-sxmtnvdI4Qw';

let map = null

import { getData } from '../lib/gtfs/gtfs'
import axios from 'axios';
// import stops_data from './stops.json'
import stops_data from '../assets/stops.json'

// console.log(stops_data)

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

  map.on('load', async () => {
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
        'line-width': 6,
        'line-opacity': 0.4,
        // 'line-width': 2,
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

    const geojson = await getGeoJson();
    // console.log(geojson)
    map.addSource('vehicles', {
      type: 'geojson',
      data: geojson
    });
    map.addLayer({
      'id': 'vehicles',
      'type': 'circle',
      'source': 'vehicles',
      'paint': {
        // 'circle-pitch-scale': 'map',
        'circle-color': '#ff0000',
        'circle-radius': 4
      }
    })

    map.moveLayer('route', 'stop')
    map.moveLayer('stop', 'vehicles')

    // getGeoJson()
    // Update the source from the API every 2 seconds.
    const updateSource = setInterval(async () => {
      const geojson = await getGeoJson(updateSource);
      console.log('?', geojson)
      map.getSource('vehicles').setData(geojson);
    }, 10000);

    async function getGeoJson(updateSource) {
      try {
        const feed = await getData('https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs')
        // console.log(feed)
        let geojson = {
          'type': 'FeatureCollection',
          'features': []
        };

        feed.entity.forEach(entity => {
          if (entity.vehicle) {
            // console.log(entity.vehicle)
            let stop = stops_data[entity.vehicle.stopId]
            // console.log(stop)
            geojson.features.push(
              {
                'type': 'Feature',
                'geometry': {
                  'type': 'Point',
                  'coordinates': [stop.lon, stop.lat]
                }
              }
            )
          }
        })

        return geojson
      } catch (err) {
        if (updateSource) clearInterval(updateSource);
      }
    }
  })

})
// -73.913192,40.903221
// -73.764864,40.533469



// async function onGetData() {
//   const geojson = getData()
// }
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