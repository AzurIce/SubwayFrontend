import axios from 'axios'

const apiUrl = 'https://www.goodservice.io/api/routes/?detailed=1'
const stopsUrl = 'https://www.goodservice.io/api/stops/'

type Segment = string[]
type Routings = {
    north: Segment[],
    south: Segment[]
}
type Route = {
    id: string, name: string, color: string, actual_routings: Routings, trips: {
        north: any[],
        south: any[]
    }
}
type Stop = { id: string, name: string, latitude: number, longitude: number, routes: Map<string, string[]> }

export async function getUpdateData(): Promise<{ routes: Map<string, Route>, stops: Map<string, Stop>, stations: Map<string, Station> }> {
    const apiRes = await axios.get<{ routes: any }>(apiUrl)
    const stopsRes = await axios.get<{ stops: Stop[] }>(stopsUrl)
    let _routes = new Map<string, Route>(Object.entries(apiRes.data.routes))
    // console.log('routes: ', routes)

    let _stops = new Map<string, Stop>
    stopsRes.data.stops.forEach(stop => {
        // console.log(stop)
        _stops.set(stop.id, stop)
        _stops.get(stop.id)!.routes = new Map<string, string[]>(Object.entries(stop.routes))
    });
    // console.log('stops: ', stops)


    const stationsData = new Map<string, any>(Object.entries(stationData as any))

    let _stations = new Map<string, any>()

    stationsData.forEach((__station, key) => {
        // console.log('for each station, key: ', station, key)
        const routeKeys = Array.from(_stops.get(key)!.routes.keys())
        // console.log(routeKeys)

        // console.log(stops.get(key))
        const stops = new Set(_stops.get(key)!.routes.keys())
        const northStops = new Set(
            routeKeys.filter((trainId) => {
                return _stops.get(key)!.routes.get(trainId)!.includes('north')
            })
        )
        const southStops = new Set(
            routeKeys.filter((trainId) => {
                return _stops.get(key)!.routes.get(trainId)!.includes('south')
            })
        )
        const south = new Map<string, Coord[]>(Object.entries(__station.south))
        const north = new Map<string, Coord[]>(Object.entries(__station.north))
        _stations.set(key, {
            id: __station.id,
            name: __station.name,
            latitude: __station.latitude,
            longitude: __station.longitude,
            stops, northStops, southStops, south, north
        })
    })


    return {
        routes: _routes,
        stops: _stops,
        stations: _stations
    }
}

import stationData from '@/data/station_details.json'
type Station = {
    id: string,
    name: string,
    latitude: string,
    longitude: string,
    north: Map<string, Coord[]>,
    south: Map<string, Coord[]>,
    stops: Set<string>
    northStops: Set<string>
    southStops: Set<string>
}
type Coord = number[]
export function getParsedStations(stops: Map<string, Stop>): Map<string, Station> {
    let res = new Map<string, any>(Object.entries(stationData as any))

    res.forEach((station, key) => {
        // console.log('for each station, key: ', station, key)
        const routeKeys = Array.from(stops.get(key)!.routes.keys())
        // console.log(routeKeys)

        // console.log(stops.get(key))
        station['stops'] = new Set(stops.get(key)!.routes.keys())
        station['northStops'] = new Set(
            routeKeys.filter((trainId) => {
                return stops.get(key)!.routes.get(trainId)!.includes('north')
            })
        )
        station['southStops'] = new Set(
            routeKeys.filter((trainId) => {
                return stops.get(key)!.routes.get(trainId)!.includes('south')
            })
        )
        station['south'] = new Map<string, Coord[]>(Object.entries(station.south))
        station['north'] = new Map<string, Coord[]>(Object.entries(station.north))
    })
    // console.log(res)
    return res
}