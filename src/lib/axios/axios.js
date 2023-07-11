import axios from 'axios'

export function get(url) {
  return axios.get(url, {
    timeout: 2000,
    headers: {
      token: window.localStorage.getItem('xxqToken')
    }
  })
}

export function post(url, data) {
  return axios.post(url, data, {
    timeout: 2000,
    headers: {
      token: window.localStorage.getItem('xxqToken')
    }
  })
}
