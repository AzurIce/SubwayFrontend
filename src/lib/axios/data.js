import { get } from './axios'

async function getTimeRange() {
    const res = await get('/time')
    const timeRange = {
        start: Date.parse(res.data.beginTime),
        end: Date.parse(res.data.endTime)
    }
    return timeRange
}

async function _getTrueData(time, id) {
    const res = await get(`/true/ai?dateTime=${time}&GTFSid=${id}`)
    return res
}

// async function getTrueData(startTime, endTime, id) {
//     const timeRange = await getTimeRange()

//     let result = []
//     for (let i = -6; i <= 0; i++) {
//         let time = new Date(timeRange.start)
//         time.setHours(time.getHours() + i * 4)
//         const res = await _getTrueData(parseTime(time), id)
//         result.push(res.data)
//     }

//     console.log(result)
// }

function rand() {
    return Math.floor(Math.random() * 200)
}
function parseTime(time) {
    // console.log(time)
    // console.log(time.getMonth())
    return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ${time.getHours()}:00:00`
}

export async function getData(id) {
    const date = new Date()
    // console.log(date)
    date.setFullYear(date.getFullYear() - 3)
    date.setHours(Math.floor(date.getHours() / 4) * 4)
    // console.log(date)

    let result = []
    for (let i = -6; i <= 0; i++) {
        let time = new Date(date)
        time.setHours(time.getHours() + i * 4)
        // console.log(time)
        // const res = await _getTrueData(`${time.getFullYear}-${time.getMonth}-${time.getDate} ${time.getHours}:00:00`, id)
        // result.push(res.data)
        result.push({
            dateTime: parseTime(time),
            tExits: rand(),
            GTFS_Stop_ID: id,
            tEntries: rand()
        })
    }
    
    for (let i = 1; i <= 3; i++) {
        let time = new Date(date)
        time.setHours(time.getHours() + i * 4)
        // console.log(time)
        // const res = await _getTrueData(`${time.getFullYear}-${time.getMonth}-${time.getDate} ${time.getHours}:00:00`, id)
        // result.push(res.data)
        result.push({
            dateTime: parseTime(time),
            tExits: rand(),
            GTFS_Stop_ID: id,
            tEntries: rand()
        })
    }
    return result
}