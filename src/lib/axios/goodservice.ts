import axios from 'axios'

const apiUrl = 'https://www.goodservice.io/api/routes/?detailed=1'
const stopsUrl = 'https://www.goodservice.io/api/stops/'

type Routings = {
    north: string[],
    south: string[]
}
type Route = { id: string, name: string, color: string, actual_routings: Routings }
type Stop = { id: string, name: string, latitude: number, longitude: number, routes: Map<string, string[]> }

export async function getUpdateData(): Promise<{ routes: Map<String, Route>, stops: Map<String, Stop> }> {
    const apiRes = await axios.get<{ routes: Map<String, Route> }>(apiUrl)
    const stopsRes = await axios.get<{ stops: Stop[] }>(stopsUrl)

    let stops = new Map<String, Stop>
    stopsRes.data.stops.forEach(stop => {
        stops.set(stop.id, stop)
    });
    return {
        routes: apiRes.data.routes,
        stops
    }
}