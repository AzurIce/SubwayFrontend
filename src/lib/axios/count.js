import { get } from './axios'

async function _getTrueData(time, id) {
    const res = await get(`/true/at?dateTime=${time}&GTFSid=${id}`)
    return res
  }


  function parseTime(time) {
    let month = time.getMonth() + 1
    if (month < 10) {
      month = `0${month}`
    } else {
      month = `${month}`
    }
  
    let hour = time.getHours()
    if (hour < 10) {
      hour = `0${hour}`
    } else {
      hour = `${hour}`
    }
  
    return `${time.getFullYear()}-${month}-${time.getDate()} ${hour}:00:00`
  }

  export async function getData(id) {
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

  export function getCurData(){
    const date=new Date()
    date.setHours(Math.floor(date.getHours() / 4) * 4)
    return parseTime(date)
  }

  export async function getAppointData(date,id){
    let result=[]
    for(let i=-6;i<=0;i++){
        let time=new Date(date)
        time.setHours(time.getHours()+i*4)
        const res=await _getTrueData(parseTime(time),id)
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

  //得到站点信息
  export async function getAllStations(){
    return await get('/station/name')
  }
