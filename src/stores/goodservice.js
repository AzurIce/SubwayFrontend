import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'


import * as turf from '@turf/turf'

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
  Object.keys(stationData).forEach((key) => {
    stations[key] = stationData[key]
    stations[key]['id'] = key
    stations[key]['northStops'] = new Set()
    stations[key]['southStops'] = new Set()
    stations[key]['stops'] = new Set()
  })
  return stations
}

import { getUpdateData, getParsedStations } from '@/lib/axios/goodservice'

export const useMapStore = defineStore('goodservice', () => {
  let trains = new Map()
  let stops = {}
  let stations = initStations()
  const processedRoutings = ref({})
  let routingByDirection = {}
  const routeStops = ref({})
  const destinations = ref(new Set())
  const transferStations = ref(new Set())
  const calculatedPaths = {}

  const offsets = ref({})

  function shouldReverseDirection(fromRouteId, toRouteId, stationId) {
    return Object.keys(STATIONS_TO_FLIP_DIRECTIONS).some((targetStation) => {
      const triggerStation = STATIONS_TO_FLIP_DIRECTIONS[targetStation];
      return (
        stationId === targetStation &&
        stations.get(triggerStation).stops.has(fromRouteId) !==
        stations.get(triggerStation).stops.has(toRouteId)
      ) || fromRouteId === 'M' && M_TRAIN_SHUFFLE.includes(stationId);
    })
  }

  function calculateOffsets() {
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
        // console.log(stations.get(stop))
        stations.get(stop).stops.forEach((route, key) => {
          // console.log(key)
          if (_offsets[key] != undefined) {
            let offsetToUse = _offsets[key];
            if (shouldReverseDirection(train, key, stop)) {
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

      while (conflictingOffsets.has(offset)) {
        offset++;
      }

      _offsets[train] = offset;
    });

    Object.keys(_offsets).forEach((key) => {
      _results[key] = offsetsMap[_offsets[key]]
    });
    // console.log('offset: ', _results)
    offsets.value = _results
  }

  function processRoutings() {
    // stations = getParsedStations(stops)
    // console.log(stops)
    // console.log(stations)


    const _processedRoutings = {}
    const _routingByDirection = {}
    const _routeStops = {}
    const _destinations = new Set()
    const _transferStations = new Set()

    trains.forEach((route, key) => {
      const southStops = new Set()
      const northStops = new Set()
      _routeStops[key] = new Set()

      const northRoutings = route.actual_routings?.north?.map((r) => {
        return r.map((stopId) => {
          if (stations.get(stopId)) {
            _routeStops[key].add(stopId)
            northStops.add(stopId)
          }
          return stopId
        })
      }) || []

      const southRoutings =
        route.actual_routings?.south?.map((r) => {
          return r.map((stopId) => {
            if (stations.get(stopId)) {
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
      // console.log(northRoutings, southRoutings)
      northRoutings.forEach((routing) => {
        _destinations.add(routing[routing.length - 1])
      })
      southRoutings.forEach((routing) => {
        _destinations.add(routing[routing.length - 1])
      })

      // console.log('_destinations: ', _destinations)

      const allRoutings = northRoutings.concat(
        southRoutings.map((routing) => routing.slice(0).reverse())
      )
      _processedRoutings[key] = Array.from(new Set(allRoutings.map(JSON.stringify)), JSON.parse)

    })

    // console.log('_processedRoutings: ', _processedRoutings)

    Object.keys(_processedRoutings).forEach((key) => {
      const routings = _processedRoutings[key]
      routings.forEach((route) => {
        let prevStop = null
        let prevTrains = []

        route.forEach((stop) => {
          const stopData = stops.get(stop)

          if (!stopData) {
            return
          }

          const trains = Object.keys(stops.get(stop).routes).flatMap((r) =>
            stops.get(stop).routes[r].map((d) => `${r}-${d}`)
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
    // console.log('processedRoutings: ', processedRoutings.value)
    routingByDirection = _routingByDirection
    // console.log(routingByDirection)
    routeStops.value = _routeStops
    destinations.value = _destinations
    transferStations.value = _transferStations
  }

  async function updateData() {
    const res = await getUpdateData()
    trains = res.routes
    stops = res.stops
    stations = res.stations
    // console.log('getUpdateData: ', res)

    processRoutings()
    // console.log('processedRoutings2: ', processedRoutings.value)
    calculateOffsets()
  }

  function findPath(start, end, stepsTaken, stopsVisited) {
    // console.log(stations)
    if (calculatedPaths[`${start}-${end}`]) {
      return calculatedPaths[`${start}-${end}`]
    }
    if (stopsVisited.includes(start)) {
      return
    }
    stopsVisited.push(start)
    // console.log(stations.get(start), stations.get(start).north)
    if (!stations.get(start) || !stations.get(start).north) {
      return
    }
    // console.log(stations.get(start).north).get(end)
    const tt = stations.get(start).north.get(end)
    if (tt) {
      if (tt.length > 0) {
        return tt
      }
      return [[stations.get(end).longitude, stations.get(end).latitude]]
    } else if (stepsTaken > 12) {
      return
    }

    let results = []
    stations.get(start).north.forEach((s, key) => {
      const path = findPath(key, end, stepsTaken + 1, stopsVisited)
      if (path && path.length) {
        if (stations.get(start).north.get(key).length) {
          results = stations.get(start).north.get(key)
            .concat([[stations.get(key).longitude, stations.get(key).latitude]])
            .concat(path)
        } else {
          results = [[stations.get(key).longitude, stations.get(key).latitude]].concat(path)
        }
      }
    })
    // console.log(results)
    calculatedPaths[`${start}-${end}`] = results
    return results
  }

  function getRoutePath(route) {
    // console.log('getRoutePath: ', route)
    const r = route.slice(0)

    let path = []
    let prev = r.splice(0, 1)[0]

    r.forEach((stopId, index) => {
      let tempPath = []
      tempPath.push([stations.get(prev).longitude, stations.get(prev).latitude])
      let potentialPath = findPath(prev, stopId, 0, [])
      // console.log(potentialPath)
      if (potentialPath) {
        potentialPath.forEach((coord) => {
          tempPath.push(coord)
        })
      }
      // console.log(stations.get(stopId))
      if (stations.get(stopId)) {
        tempPath.push([stations.get(stopId).longitude, stations.get(stopId).latitude])
        path = path.concat(tempPath)

        prev = stopId
      }
    })

    // console.log(path)
    return path
  }

  async function getRoutesGeoJson(refreshData) {
    if (refreshData) {
      await updateData()
    }

    // console.log('processedRoutings: ', processedRoutings.value)

    // console.log(processedRoutings.value['2'].map((r) => { return getRoutePath(r) }))

    let features = []
    trains.forEach((value, key) => {
      // console.log(key)
      if (processedRoutings.value[key] == undefined || !processedRoutings.value[key].length) {
        return
      }

      // console.log(processedRoutings.value[key])
      const coordinates = processedRoutings.value[key].map((r) => {
        return getRoutePath(r)
      })
      // console.log(coordinates)

      const route = trains.get(key)
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
      features.push(geojson)
    })

    const geojson = {
      'type': 'FeatureCollection',
      'features': features
    }
    return geojson
  }

  function calculateTrainPositions(currentTime) {
    // const _routingByDirection = routingByDirection.value
    let trainPositions = [];

    // console.log(trains)
    trains.forEach((route, routeId) => {

      const arrivalInfo = route.trips;
      if (!arrivalInfo) {
        return;
      }
      // console.log(route, routeId)

      new Array('north', 'south').forEach((direction) => {
        // if (!routingByDirection[routeId].north.length || !routingByDirection[routeId].south.length) {
        //   return ;
        // }
        const fullRoutings = routingByDirection[routeId] && routingByDirection[routeId][direction];
        // console.log(routingByDirection)
        // console.log(routingByDirection[routeId])
        // console.log('fullRoutings: ', fullRoutings)

        // console.log(arrivalInfo)
        // console.log(direction)
        // console.log(arrivalInfo[direction])
        // console.log(arrivalInfo['north'])
        const trainArrivals = arrivalInfo[direction] || [];
        // console.log("?")
        // console.log('trainArrivals; ', trainArrivals)

        trainArrivals.forEach((arr) => {
          let previousStation;
          let nextStation;
          let previousStationEstimatedTime;
          let nextStationEstimatedTime;
          const sortedStops = Object.keys(arr.stops).sort((a, b) => arr.stops[a] - arr.stops[b]);
          // console.log('sortedStops: ', sortedStops)

          if (arr.is_delayed) {
            previousStation = arr.last_stop_made;
            const previousStationIndex = previousStation && sortedStops.indexOf(previousStation);
            nextStation = previousStation && sortedStops[previousStationIndex + 1];

            if (!nextStation || !previousStation) {
              return;
            }
            previousStationEstimatedTime = arr.stops[previousStation];
            nextStationEstimatedTime = Math.max(arr.stops[nextStation], currentTime + 60);

          } else {
            nextStation = sortedStops.find((key) => arr.stops[key] > currentTime && stations.get(key));
            nextStationEstimatedTime = arr.stops[nextStation];

            const precedingStations = sortedStops.slice(0, sortedStops.indexOf(nextStation)).reverse();
            previousStation = precedingStations.find((key) => arr.stops[key] <= currentTime && stations.get(key));
            previousStationEstimatedTime = arr.stops[previousStation];

            // console.log('previousStation: ', previousStation)
            if (!previousStation) {
              const nextId = nextStation;
              if (fullRoutings.some((r) => r[0] === nextId)) {
                // console.log('fullRoutings.some return')
                return;
              }

              const matchedRouting = fullRoutings.find((r) => r.includes(nextId))
              // console.log(matchedRouting)
              if (!matchedRouting) {
                // console.log('matchedRouting return')
                return;
              }

              const precedingStops = matchedRouting.slice(0, matchedRouting.indexOf(nextId)).reverse();
              previousStation = precedingStops.find((stop) => stations[stop]);
              let timeDiff = (nextStationEstimatedTime - currentTime) * 2;
              timeDiff = (timeDiff < 420) ? 420 : timeDiff;
              previousStationEstimatedTime = nextStationEstimatedTime - timeDiff;
            }
          }

          // console.log(nextStation, previousStation)
          if (!nextStation || !previousStation) {
            return;
          }

          const next = {
            stop_id: nextStation,
            estimated_time: nextStationEstimatedTime,
          };

          const prev = {
            stop_id: previousStation,
            estimated_time: previousStationEstimatedTime,
          }

          // console.log("???")
          trainPositions.push({
            route: routeId,
            routeName: route.name,
            id: arr.id,
            direction: direction,
            delayed: arr.is_delayed,
            prev: prev,
            next: next
          });
        });
      });
    })

    return trainPositions;
  }

  function routingGeoJson(routing) {
    const r = routing.slice(0);

    let path = []
    let prev = r.splice(0, 1)[0];

    r.forEach((stopId, index) => {
      let tempPath = [];
      tempPath.push([stations.get(prev).longitude, stations.get(prev).latitude]);
      let potentialPath = findPath(prev, stopId, 0, []);
      if (potentialPath) {
        potentialPath.forEach((coord) => {
          tempPath.push(coord);
        });
      }
      if (stations.get(stopId)) {
        tempPath.push([stations.get(stopId).longitude, stations.get(stopId).latitude]);
        path = path.concat(tempPath);

        prev = stopId;
      }
    });

    return path;
  }

  async function getTrainPositionsGeoJson(refreshData) {
    const trainPositionsObj = {};
    if (refreshData) {
      await updateData()
    }

    const currentTime = Date.now() / 1000
    const trainPositions = calculateTrainPositions(currentTime)
    // console.log('trainPositions: ', trainPositions)

    const geojson = {
      "type": "FeatureCollection",
      "features": trainPositions.map((pos) => {
        const prev = pos.prev.stop_id;
        const next = pos.next.stop_id;
        const array = pos.direction === 'north' ? [prev, next] : [next, prev];
        const geoJson = routingGeoJson(array);
        const lineSegment = turf.helpers.lineString(pos.direction === 'north' ? geoJson : geoJson.reverse());
        const lineLength = turf.length(lineSegment);
        const diffTime = pos.next.estimated_time - pos.prev.estimated_time;
        const progress = (currentTime - pos.prev.estimated_time) / diffTime;
        const estimatedDistanceTraveled = progress * lineLength;
        const feature = turf.along(lineSegment, estimatedDistanceTraveled);
        const pointAhead = turf.along(lineSegment, estimatedDistanceTraveled + 0.01);
        const bearing = turf.bearing(
          turf.helpers.point(feature.geometry.coordinates), turf.helpers.point(pointAhead.geometry.coordinates)
        );
        // const bearingInRads = (bearing - this.map.getBearing()) * (Math.PI / 180);
        const textColor = trains.get(pos.route).color.toLowerCase() === '#fbbd08' ? '#000000' : '#ffffff';
        // let visibility = false;

        // if ((this.selectedTrip && this.selectedTrip.id === pos.id) || this.selectedTrains.includes(pos.route)) {
        //   visibility = true;
        // }
        let textRotate = 0;

        // if (pos.routeName.endsWith('X')) {
        //   textRotate = (bearing + 225) % 90 - 45 - this.map.getBearing();
        // }

        trainPositionsObj[pos.id] = feature.geometry.coordinates;

        // console.log(trains.value[pos.route].color.slice(1).toLowerCase())
        feature.properties = {
          "route": pos.routeName.endsWith('X') ? pos.routeName[0] : pos.routeName,
          "routeId": pos.route,
          "tripId": pos.id,
          "direction": pos.direction,
          "color": trains.get(pos.route).color,
          // "icon": pos.routeName.endsWith('X') ? `train-pos-x-${trains.value[pos.route].color.slice(1).toLowerCase()}` : `train-pos-${trains.value[pos.route].color.slice(1).toLowerCase()}`,
          "icon": 'train',
          "icon-color": trains.get(pos.route).color,
          "text-color": textColor,
          "alternate-text-color": (pos.delayed) ? '#ff0000' : textColor,
          "halo-width": (pos.delayed) ? 1 : 0,
          "bearing": bearing,
          "text-rotate": textRotate,
          // "offset": [Math.sin(bearingInRads) * -0.3, Math.cos(bearingInRads) * 0.3],
          // "visibility": visibility,
        }

        return feature;
      })
    }
    return geojson
  }

  return { updateData, getRoutesGeoJson, getTrainPositionsGeoJson }
})
