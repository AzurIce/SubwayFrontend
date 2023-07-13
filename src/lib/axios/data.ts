import { get } from './axios'

import stationData from '@/data/station_details.json'

// async function getTimeRange() {
//   const res = await get('/time')
//   const timeRange = {
//     start: Date.parse(res.data.beginTime),
//     end: Date.parse(res.data.endTime)
//   }
//   return timeRange
// }

async function _getTrueData(time: string, id: string) {
  const res = await get(`/true/at?dateTime=${time}&GTFSid=${id}`)
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

// function rand() {
//   return Math.floor(Math.random() * 200)
// }

function parseTime(time: Date) {
  // console.log(time)
  // console.log(time.getMonth())
  let month = time.getMonth() + 1
  let monthStr = `${month}`
  if (month < 10) {
    monthStr = `0${month}`
  }

  let hour = time.getHours()
  let hourStr = `${hour}`
  if (hour < 10) {
    hourStr = `0${hour}`
  }

  return `${time.getFullYear()}-${monthStr}-${time.getDate()} ${hourStr}:00:00`
}

export async function getData(id: string): Promise<any> {
  const date = new Date()
  date.setHours(Math.floor(date.getHours() / 4) * 4)

  let result = []
  for (let i = -6; i <= 0; i++) {
    let time = new Date(date)
    time.setHours(time.getHours() + i * 4)
    const res = await _getTrueData(parseTime(time), id)
    result.push(res.data.data[0])
  }

  for (let i = 1; i <= 3; i++) {
    let time = new Date(date)
    time.setHours(time.getHours() + i * 4)
    const res = await _getTrueData(parseTime(time), id)
    result.push(res.data.data[0])
  }
  return result
}

export async function getAllTrue(): Promise<any> {
  const date = new Date()
  date.setHours(Math.floor(date.getHours() / 4) * 4)

  const datetimeStr = parseTime(date)
  console.log(`lib/axios/data.js: getAllTrue ${datetimeStr}`)
  return await get(`/true/all?dateTime=${datetimeStr}`)
}

export async function getHeatMapGeoJson() {
  console.log('lib/axios/data.js: getHeatMapGeoJson')
  const res = await getAllTrue()
  // console.log(res)

  const features = res.data.data.map((v: any) => {
    const stationInfo = (stationData as any)[v['GTFS_Stop_ID']]
    return {
      geometry: { coordinates: [stationInfo['longitude'], stationInfo['latitude']], type: 'Point' },
      properties: { Entries: v['tEntries'], Exits: v['tExits'], id: v['GTFS_Stop_ID'] }
    }
  })
  // console.log(features)
  return {
    type: 'FeatureCollection',
    features: features
  }
}


export async function getOverload(): Promise<any> {
  const now = new Date();

  const year = now.getFullYear();
  const month = ('0' + (now.getMonth() + 1)).slice(-2);
  const day = ('0' + now.getDate()).slice(-2);
  let hours = parseInt(('0' + now.getHours()).slice(-2));
  hours = hours + (4 - hours % 4);
  const formattedTime = year + "-" + month + "-" + day + " " + hours + ":00:00";
  return await get(`/warning?dateTime=${formattedTime}`)
}