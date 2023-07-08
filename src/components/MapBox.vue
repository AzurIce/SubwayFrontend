<script setup>
import axios from 'axios'
import mapboxgl from 'mapbox-gl' // or "const mapboxgl = require('mapbox-gl');"
import 'mapbox-gl/dist/mapbox-gl.css'
import { onMounted } from 'vue'

mapboxgl.accessToken =
  'pk.eyJ1IjoiYXp1cmljZSIsImEiOiJjbGpwMnQxcXIxYTNpM2VvNmo0OG14cm1xIn0.dc0RFy9AhS-sxmtnvdI4Qw'
let map = null

import stationData from '../data/station_details.json'
import shapes_geo_json from '../data/shapes.json'

const stations = {}
const stationLocations = {}
function initStations() {
  console.log('initStations...')
  Object.keys(stationData).forEach((key) => {
    stations[key] = stationData[key]
    stations[key]['id'] = key
    stations[key]['northStops'] = new Set()
    stations[key]['southStops'] = new Set()
    stations[key]['passed'] = new Set()
    stations[key]['stops'] = new Set()
    stations[key]['transfers'] = new Set()
    stations[key]['busTransfers'] = []
    stations[key]['connections'] = []
    stationLocations[`${stationData[key].longitude}-${stationData[key].latitude}`] = key
  })
  console.log('stations: ', stations)
}

let trains = []
let stops = []
let blogPost = null
let timestamp = null

const processedRoutings = {}
function calc(key) {

  Object.keys(stationData).forEach((key) => {
    stations[key] = stationData[key];
    stations[key]["passed"] = new Set();
    stations[key]["stops"] = new Set(Object.keys(stops[key].routes));
    stations[key]["northStops"] = new Set(Object.keys(stops[key].routes).filter((trainId) => {
      return stops[key].routes[trainId].includes('north');
    }));
    stations[key]["southStops"] = new Set(Object.keys(stops[key].routes).filter((trainId) => {
      return stops[key].routes[trainId].includes('south');
    }));
  });

  let routeStops = {}
  const routingByDirection = {}
  const destinations = new Set()
  const transferStations = new Set()

  const northStops = new Set()
  const southStops = new Set()
  const route = trains[key]
  routeStops[key] = new Set()
  // console.log(route.actual_routings)
  const northRoutings =
    route.actual_routings?.north?.map((r) => {
      return r.map((stopId) => {
        if (stations[stopId]) {
          routeStops[key].add(stopId)
          northStops.add(stopId)
        }
        return stopId
      })
    }) || []
  const southRoutings =
    route.actual_routings?.south?.map((r) => {
      return r.map((stopId) => {
        if (stations[stopId]) {
          routeStops[key].add(stopId)
          southStops.add(stopId)
        }
        return stopId
      })
    }) || []
  // console.log(northRoutings)
  // console.log(southRoutings)

  routingByDirection[key] = {
    north: northRoutings,
    south: southRoutings
  }
    ;[northRoutings, southRoutings].forEach((direction) => {
      direction.forEach((routing) => {
        destinations.add(routing[routing.length - 1])
      })
    })
  const allRoutings = northRoutings.concat(
    southRoutings.map((routing) => routing.slice(0).reverse())
  )
  processedRoutings[key] = Array.from(new Set(allRoutings.map(JSON.stringify)), JSON.parse)


  const routings = processedRoutings[key];
  routings.forEach((route) => {
    let prevStop = null;
    let prevTrains = [];

    route.forEach((stop) => {
      const stopData = stops[stop];

      if (!stopData) {
        return;
      }

      const trains = Object.keys(stops[stop].routes).flatMap((r) => stops[stop].routes[r].map((d) => `${r}-${d}`));

      if (prevStop) {
        if (trains.filter(n => !prevTrains.includes(n) && n.split('-')[0] !== key).length > 0) {
          transferStations.add(stop);
        }
        if (prevTrains.filter(n => !trains.includes(n) && n.split('-')[0] !== key).length > 0) {
          transferStations.add(prevStop)
        }
      }

      prevStop = stop;
      prevTrains = trains;
    });
  });



  // console.log(processedRoutings)
  // console.log('all:', allRoutings) // 0 -> North, 1 -> South
}

function routingGeoJson(routing) {
  console.log('routingGeoJson...')
  const r = routing.slice(0)

  let path = []
  let prev = r.splice(0, 1)[0]

  r.forEach((stopId, index) => {
    let tempPath = []
    // console.log('prev: ', prev)
    tempPath.push([stations[prev].longitude, stations[prev].latitude])
    let potentialPath = findPath(prev, stopId, 0, [])
    if (potentialPath) {
      potentialPath.forEach((coord) => {
        tempPath.push(coord)
      })
    }
    if (stations[stopId]) {
      tempPath.push([stations[stopId].longitude, stations[stopId].latitude])
      path = path.concat(tempPath)

      prev = stopId
    }
  })

  return path
}

const calculatedPaths = {}

function findPath(start, end, stepsTaken, stopsVisited) {
  if (calculatedPaths[`${start}-${end}`]) {
    return calculatedPaths[`${start}-${end}`]
  }
  if (stopsVisited.includes(start)) {
    return
  }
  stopsVisited.push(start)
  if (!stations[start] || !stations[start]['north']) {
    return
  }
  if (stations[start]['north'][end] != undefined) {
    if (stations[start]['north'][end].length > 0) {
      return stations[start]['north'][end]
    }
    return [[stations[end].longitude, stations[end].latitude]]
  } else if (stepsTaken > 12) {
    return
  }
  let results = []
  Object.keys(stations[start]['north']).forEach((key) => {
    const path = findPath(key, end, stepsTaken + 1, stopsVisited)
    if (path && path.length) {
      if (stations[start]['north'][key].length) {
        results = stations[start]['north'][key]
          .concat([[stations[key].longitude, stations[key].latitude]])
          .concat(path)
      } else {
        results = [[stations[key].longitude, stations[key].latitude]].concat(path)
      }
    }
  })
  calculatedPaths[`${start}-${end}`] = results
  return results
}

function renderRoute(route_key) {
  console.log(`Rendering route ${route_key}...`)
  calc(route_key)
  if (!processedRoutings[route_key].length) {
    return
  }
  console.log(`processedRoutings[${route_key}]: `, processedRoutings[route_key])
  const coordinates = processedRoutings[route_key].map((r) => {
        return routingGeoJson(r)
      });
  // console.log(geojson)

  const route = trains[route_key]
  const geojson = {
    type: 'Feature',
    properties: {
      color: route.color,
      // "offset": offsets[key],
      opacity: 1
    },
    geometry: {
      type: 'MultiLineString',
      coordinates: coordinates
    }
  }

  console.log(geojson)
  // const s = map.getSource('route')
  console.log(shapes_geo_json)

  const layerId = `${route_key}-train`
  // if (map.getSource(layerId)) {
  //   map.getSource(layerId).setData(geojson);
  // } else {
  map.addSource(layerId, {
    type: 'geojson',
    data: geojson
  })
  // }

  // if (!map.getLayer(layerId)) {
  console.log('layerId')
  const layer = {
    id: layerId,
    type: 'line',
    source: layerId,
    layout: {
      'line-join': 'miter',
      'line-cap': 'round'
    },
    paint: {
      'line-width': 4,
      // "line-width": [
      //   "interpolate",
      //   ["linear"],
      //   ["zoom"],
      //   8, 1,
      //   13, 2,
      //   14, 5,
      // ],
      "line-color": ["get", "color"],
      // "line-offset": [
      //   "interpolate",
      //   ["linear"],
      //   ["zoom"],
      //   8, ["get", "offset"],
      //   13, ["*", ["get", "offset"], 1.5],
      //   14, ["*", ["get", "offset"], 3],
      // ],
      // "line-opacity": ["get", "opacity"],
    }
  }

  map.addLayer(layer)
}

import stations_json from '../data/stations.json'

onMounted(() => {
  initStations()
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
    map.addSource('route', {
      type: 'geojson',
      data: 'shapes.geojson'
    })
    map.addSource('stop', {
      type: 'geojson',
      data: 'stations.geojson'
    })
    // map.addLayer({
    //   'id': 'route',
    //   'type': 'line',
    //   'source': 'route',
    //   'layout': {
    //     'line-join': 'round',
    //     'line-cap': 'round',
    //   },
    //   'paint': {
    //     'line-color': ["get", 'color'],
    //     'line-width': 6,
    //     'line-opacity': 0.4,
    //     // 'line-width': 2,
    //     // 'line-opacity': 0.6,
    //   }
    // })
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

    // const geojson = await getGeoJson();
    // console.log(geojson)
    // map.addSource('vehicles', {
    //   type: 'geojson',
    //   data: geojson
    // });
    // map.addLayer({
    //   'id': 'vehicles',
    //   'type': 'circle',
    //   'source': 'vehicles',
    //   'paint': {
    //     // 'circle-pitch-scale': 'map',
    //     'circle-color': '#ff0000',
    //     'circle-radius': 4
    //   }
    // })

    // map.moveLayer('route', 'stop')
    // map.moveLayer('stop', 'vehicles')

    // getGeoJson()
    // // Update the source from the API every 2 seconds.
    // const updateSource = setInterval(async () => {
    //   const geojson = await getGeoJson(updateSource);
    //   console.log('?', geojson)
    //   map.getSource('vehicles').setData(geojson);
    // }, 10000);

    // async function getGeoJson(updateSource) {
    //   try {
    //     const feed = await getData('https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs')
    //     // console.log(feed)
    //     let geojson = {
    //       'type': 'FeatureCollection',
    //       'features': []
    //     };

    //     feed.entity.forEach(entity => {
    //       if (entity.vehicle) {
    //         // console.log(entity.vehicle)
    //         let stop = stops_data[entity.vehicle.stopId]
    //         // console.log(stop)
    //         geojson.features.push(
    //           {
    //             'type': 'Feature',
    //             'geometry': {
    //               'type': 'Point',
    //               'coordinates': [stop.lon, stop.lat]
    //             }
    //           }
    //         )
    //       }
    //     })

    //     return geojson
    //   } catch (err) {
    //     if (updateSource) clearInterval(updateSource);
    //   }
    // }

    const route_keys = ['1', '2', '3', '4', '5', '6', '6X', '7', '7X',
      'A', 'B', 'C', 'D', 'E', 'F', 'FX', 'G', 'J', 'L', 'M', 'N', 'Q', 'R',
      'GS', 'FS', 'H', 'SI', 'W', 'Z']

    const apiUrl = 'https://www.goodservice.io/api/routes/?detailed=1'
    const stopsUrl = 'https://www.goodservice.io/api/stops/'

    const apiRes = await axios.get(apiUrl)
    const stopsRes = await axios.get(stopsUrl)
    trains = apiRes.data.routes
    blogPost = apiRes.data.blog_post
    timestamp = apiRes.data.timestamp
    let _stops = []
    stopsRes.data.stops.forEach((stop) => {
      // if (stop.accessibility) {
      //   stop.accessibility.directions.forEach((direction) => {
      //     accessibleStations[direction].push(stop.id);
      //   });
      //   if (stop.accessibility.advisories.length > 0) {
      //     outages[stop.id] = stop.accessibility.advisories;
      //   }
      // }
      stop.transfers?.forEach((toStop) => {
        if (stations[stop.id]) {
          stations[stop.id]["transfers"].add(toStop);
        }
      })
      _stops[stop.id] = stop;
      if (stop.bus_transfers) {
        stations[stop.id]["busTransfers"] = stop.bus_transfers;
      }
      if (stop.connections) {
        stations[stop.id]["connections"] = stop.connections;
      }
    })
    stops = _stops
    // for (let route_key in res.data.routes) {
    //   renderRoute(route_key, res)
    // }
    renderRoute('2')

    stations_json.forEach(function (point) {
      // 创建DOM元素，用于显示标记和名称
      var el = document.createElement('div');
      el.className = 'marker';
      el.textContent = point.id;
      el.style = 'color: white'

      // 创建标记，并将其添加到地图上
      new mapboxgl.Marker(el)
        .setLngLat(point.coord)
        .addTo(map);
    });
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