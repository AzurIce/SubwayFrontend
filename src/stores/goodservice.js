import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const apiUrl = 'https://www.goodservice.io/api/routes/?detailed=1'
const stopsUrl = 'https://www.goodservice.io/api/stops/'

import stationData from '../data/station_details.json'
function initStations() {
  let stations = {}
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
    // stationLocations[`${stationData[key].longitude}-${stationData[key].latitude}`] = key
  })
  return stations
}

export const useCounterStore = defineStore('goodservice', () => {
  const trains = ref([])
  const stops = ref([])
  const blogPost = ref({})
  const timestamp = ref(0)
  const stations = ref({})
  const processedRoutings = ref({})

  function processRoutings() {
    Object.keys(stationData).forEach((key) => {
      stations[key] = stationData[key]
      stations[key]['passed'] = new Set()
      stations[key]['stops'] = new Set(Object.keys(stops[key].routes))
      stations[key]['northStops'] = new Set(
        Object.keys(stops[key].routes).filter((trainId) => {
          return stops[key].routes[trainId].includes('north')
        })
      )
      stations[key]['southStops'] = new Set(
        Object.keys(stops[key].routes).filter((trainId) => {
          return stops[key].routes[trainId].includes('south')
        })
      )
    })

    const routingByDirection = {}
    const routeStops = {}
    const destinations = new Set()
    const transferStations = new Set()

    Object.keys(trains.value).forEach((key) => {
      const northStops = new Set()
      const southStops = new Set()
      const route = trains.value[key]
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
    })

    Object.keys(processedRoutings).forEach((key) => {
      const routings = processedRoutings[key]
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
              transferStations.add(stop)
            }
            if (
              prevTrains.filter((n) => !trains.includes(n) && n.split('-')[0] !== key).length > 0
            ) {
              transferStations.add(prevStop)
            }
          }

          prevStop = stop
          prevTrains = trains
        })
      })
    })
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
        if (stations[stop.id]) {
          stations[stop.id]['transfers'].add(toStop)
        }
      })
      _stops[stop.id] = stop
      if (stop.bus_transfers) {
        stations[stop.id]['busTransfers'] = stop.bus_transfers
      }
      if (stop.connections) {
        stations[stop.id]['connections'] = stop.connections
      }
    })
    stops.value = _stops
  }

  async function getRoutesGeoData() {}

  return { getRoutesGeoData }
})
