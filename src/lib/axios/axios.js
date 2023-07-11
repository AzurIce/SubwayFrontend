import axios from 'axios'

// const host = 'http://192.168.43.128:3308'
const host = 'http://124.70.109.243:3308'

export function get(url) {
  return axios.get(`${host}${url}`, {
    timeout: 2000,
    headers: {
      token: window.localStorage.getItem('xxqToken')
    }
  })
}

export function post(url, data) {
  return axios.post(`${host}${url}`, data, {
    timeout: 2000,
    headers: {
      token: window.localStorage.getItem('xxqToken')
    }
  })
}
