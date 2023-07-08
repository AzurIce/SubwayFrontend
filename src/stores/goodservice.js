import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const apiUrl = 'https://www.goodservice.io/api/routes/?detailed=1'
const stopsUrl = 'https://www.goodservice.io/api/stops/'

const M_TRAIN_SHUFFLE = ["M21", "M20", "M19", "M18", "M16", "M14", "M13", "M12", "M11"];

// Trains passing through these stations can be physically in the opposite direction of trains that are running in the same direction
// The keys represent such stations, the values represent subsequent stations that if a train stops there, we would need to reverse its direction of the keys
const STATIONS_TO_FLIP_DIRECTIONS = {
  "D14": "F12",
  "D43": "D42",
  "A42": "G36",
}

const routeIds = [
  '2', '3', '1', '4', '5', '6', '6X', '7', '7X', 'A', 'AL', 'C', 'E', 'F', 'FX',
  'D', 'B', 'M', 'J', 'Z', 'R', 'N', 'Q', 'W', 'G', 'H', 'FS', 'GS', "L", "SI"
];

import stationData from '../data/station_details.json'
function initStations() {
  let stations = {}
  // console.log('initStations...')
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
    // stationLocations[`${stationData[key].longitude}-${stationData[key].latitude}`] = key
  })
  return stations
}

export const useMapStore = defineStore('goodservice', () => {
  const trains = ref([])
  const stops = ref([])
  const blogPost = ref({})
  const timestamp = ref(0)
  const stations = ref(initStations())
  const processedRoutings = ref({})
  const routingByDirection = ref({})
  const routeStops = ref({})
  const destinations = ref(new Set())
  const transferStations = ref(new Set())
  const calculatedPaths = {}

  const offsets = ref({})

  function shouldReverseDirection(fromRouteId, toRouteId, stationId) {
    return Object.keys(STATIONS_TO_FLIP_DIRECTIONS).some((targetStation) => {
      const triggerStation = STATIONS_TO_FLIP_DIRECTIONS[targetStation];
      return (stationId === targetStation && stations[triggerStation].stops.has(fromRouteId) !== stations[triggerStation].stops.has(toRouteId)) || fromRouteId === 'M' && M_TRAIN_SHUFFLE.includes(stationId);
    })
    // return false;
  }

  function calculateOffsets() {
    // if (!this.mapLoaded) {
    //   this.map.on('load', () => {
    //     this.calculateOffsets();
    //   });
    //   return;
    // }

    const _offsets = {};
    const _results = {};
    const offsetsMap = [0, -2, 2, -4, 4, -6, 6];

    routeIds.forEach((train) => {
      let offset = 0;
      let conflictingOffsets = new Set();
      const stops = routeStops.value[train];

      if (!stops) {
        return;
      }

      stops.forEach((stop) => {
        stations.value[stop]["stops"].forEach((route) => {
          if (_offsets[route] != undefined) {
            let offsetToUse = _offsets[route];
            if (shouldReverseDirection(train, route, stop)) {
              if (offsetToUse > 0) {
                if (offsetToUse % 2 === 1) {
                  offsetToUse++;
                } else {
                  offsetToUse--;
                }
              }
            }
            conflictingOffsets.add(offsetToUse);
          }
        });
      });

      while(conflictingOffsets.has(offset)) {
        offset++;
      }

      _offsets[train] = offset;
    });
    // console.log(_offsets)

    Object.keys(_offsets).forEach((key) => {
      _results[key] = offsetsMap[_offsets[key]]
    });
    offsets.value = _results
    // console.log(_results)
  }



  function processRoutings() {
    Object.keys(stationData).forEach((key) => {
      stations[key] = stationData[key]
      stations[key]['passed'] = new Set()
      stations[key]['stops'] = new Set(Object.keys(stops.value[key].routes))
      stations[key]['northStops'] = new Set(
        Object.keys(stops.value[key].routes).filter((trainId) => {
          return stops.value[key].routes[trainId].includes('north')
        })
      )
      stations[key]['southStops'] = new Set(
        Object.keys(stops.value[key].routes).filter((trainId) => {
          return stops.value[key].routes[trainId].includes('south')
        })
      )
    })

    const _processedRoutings = {}
    const _routingByDirection = {}
    const _routeStops = {}
    const _destinations = new Set()
    const _transferStations = new Set()

    Object.keys(trains.value).forEach((key) => {
      const northStops = new Set()
      const southStops = new Set()
      const route = trains.value[key]
      _routeStops[key] = new Set()
      const northRoutings =
        route.actual_routings?.north?.map((r) => {
          return r.map((stopId) => {
            if (stations.value[stopId]) {
              _routeStops[key].add(stopId)
              northStops.add(stopId)
            }
            return stopId
          })
        }) || []
      const southRoutings =
        route.actual_routings?.south?.map((r) => {
          return r.map((stopId) => {
            if (stations.value[stopId]) {
              _routeStops[key].add(stopId)
              southStops.add(stopId)
            }
            return stopId
          })
        }) || []
      _routingByDirection[key] = {
        north: northRoutings,
        south: southRoutings
      }
      ;[northRoutings, southRoutings].forEach((direction) => {
        direction.forEach((routing) => {
          _destinations.add(routing[routing.length - 1])
        })
      })
      const allRoutings = northRoutings.concat(
        southRoutings.map((routing) => routing.slice(0).reverse())
      )
      _processedRoutings[key] = Array.from(new Set(allRoutings.map(JSON.stringify)), JSON.parse)
    })

    Object.keys(_processedRoutings).forEach((key) => {
      const routings = _processedRoutings[key]
      routings.forEach((route) => {
        let prevStop = null
        let prevTrains = []

        route.forEach((stop) => {
          const stopData = stops[stop]

          if (!stopData) {
            return
          }

          const trains = Object.keys(stops[stop].routes).flatMap((r) =>
            stops[stop].routes[r].map((d) => `${r}-${d}`)
          )

          if (prevStop) {
            if (
              trains.filter((n) => !prevTrains.includes(n) && n.split('-')[0] !== key).length > 0
            ) {
              _transferStations.add(stop)
            }
            if (
              prevTrains.filter((n) => !trains.includes(n) && n.split('-')[0] !== key).length > 0
            ) {
              _transferStations.add(prevStop)
            }
          }

          prevStop = stop
          prevTrains = trains
        })
      })
    })

    processedRoutings.value = _processedRoutings
    routingByDirection.value = _routingByDirection
    routeStops.value = _routeStops
    destinations.value = _destinations
    transferStations.value = _transferStations
  }

  async function updateData() {
    const apiRes = await axios.get(apiUrl)
    trains.value = apiRes.data.routes
    blogPost.value = apiRes.data.blog_post
    timestamp.value = apiRes.data.timestamp

    const stopsRes = await axios.get(stopsUrl)
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
        if (stations.value[stop.id]) {
          stations.value[stop.id]['transfers'].add(toStop)
        }
      })
      _stops[stop.id] = stop
      if (stop.bus_transfers) {
        stations.value[stop.id]['busTransfers'] = stop.bus_transfers
      }
      if (stop.connections) {
        stations.value[stop.id]['connections'] = stop.connections
      }
    })
    stops.value = _stops
  }

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

  function getRoutePath(route) {
    // console.log('routingGeoJson...')
    const r = route.slice(0)

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

  async function getRoutesGeoJson() {
    await updateData()
    processRoutings()
    calculateOffsets()

    let routesGeoJson = {}
    Object.keys(trains.value).forEach((key) => {
      // console.log(`Rendering route ${key}...`)
      // calc(key)
      if (!processedRoutings.value[key].length) {
        return
      }
      // console.log(`processedRoutings[${key}]: `, processedRoutings.value[key])
      const coordinates = processedRoutings.value[key].map((r) => {
        return getRoutePath(r)
      })
      // console.log(geojson)

      // console.log(key)
      // console.log(offsets.value)
      const route = trains.value[key]
      const geojson = {
        type: 'Feature',
        properties: {
          color: route.color,
          offset: offsets.value[key],
          opacity: 1
        },
        geometry: {
          type: 'MultiLineString',
          coordinates: coordinates
        }
      }
      routesGeoJson[key] = geojson
    })
    return routesGeoJson
  }

  return { getRoutesGeoJson }
})
