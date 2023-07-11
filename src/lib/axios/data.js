import { get } from './axios'

async function getTimeRange() {
    const res = await get('/time')
    const timerange = {
        start: Date.parse(res.data.beginTime),
        end: Date.parse(res.data.endTime)
    }
    return timerange
}

