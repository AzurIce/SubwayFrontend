import axios from 'axios'

const apiUrl = 'https://www.goodservice.io/api/routes/?detailed=1'
const stopsUrl = 'https://www.goodservice.io/api/stops/'

type Segment = string[]
type Routings = {
    north: Segment[],
    south: Segment[]
}
type Route = { id: string, name: string, color: string, actual_routings: Routings, trips: {
    north: any[],
    south: any[]
} }
type Stop = { id: string, name: string, latitude: number, longitude: number, routes: Map<string, string[]> }

export async function getUpdateData(): Promise<{ routes: Map<string, Route>, stops: Map<string, Stop> }> {
    const apiRes = await axios.get<{ routes: any }>(apiUrl)
    const stopsRes = await axios.get<{ stops: Stop[] }>(stopsUrl)
    let routes = new Map<string, Route>(Object.entries(apiRes.data.routes))
    // console.log('routes: ', routes)
    
    let stops = new Map<string, Stop>
    stopsRes.data.stops.forEach(stop => {
        // console.log(stop)
        stops.set(stop.id, stop)
        stops.get(stop.id)!.routes = new Map<string, string[]>(Object.entries(stop.routes))
    });
    // console.log('stops: ', stops)
    return {
        routes,
        stops
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